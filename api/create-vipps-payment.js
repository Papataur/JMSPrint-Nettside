import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  console.log("VIPPS METHOD:", req.method);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Kun POST er tillatt" });
  }

  try {
    const { total, customer, cart } = req.body;

    const varerTekst = cart
      .map((item) => {
        const productName = item.name || item.title || "Ukjent produkt";
        const colorName = item.color || item.selectedColor || "Ukjent farge";
        const price = item.price || 0;
        return `${item.quantity || 1}. ${productName} - ${colorName} - ${price} kr`;
      })
      .join("\n");

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          order_number: "Midlertidig",
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone,
          products: { items: varerTekst },
          total_price: total,
          status: "Venter Vipps",
        },
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    const orderNumber = `JMS-${String(order.id).padStart(4, "0")}`;

    await supabase
      .from("orders")
      .update({ order_number: orderNumber })
      .eq("id", order.id);

    const tokenResponse = await fetch("https://api.vipps.no/accesstoken/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        client_id: process.env.VIPPS_CLIENT_ID,
        client_secret: process.env.VIPPS_CLIENT_SECRET,
        "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY,
        "Merchant-Serial-Number": process.env.VIPPS_MSN,
        "Vipps-System-Name": "JMSPrint",
        "Vipps-System-Version": "1.0.0",
        "Vipps-System-Plugin-Name": "JMSPrint checkout",
        "Vipps-System-Plugin-Version": "1.0.0",
      },
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.message || "Kunne ikke hente Vipps-token");
    }

    const paymentResponse = await fetch("https://api.vipps.no/epayment/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.access_token}`,
        "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY,
        "Merchant-Serial-Number": process.env.VIPPS_MSN,
        "Idempotency-Key": orderNumber,
        "Vipps-System-Name": "JMSPrint",
        "Vipps-System-Version": "1.0.0",
        "Vipps-System-Plugin-Name": "JMSPrint checkout",
        "Vipps-System-Plugin-Version": "1.0.0",
      },
      body: JSON.stringify({
        amount: {
          currency: "NOK",
          value: Math.round(Number(total) * 100),
        },
        paymentMethod: {
          type: "WALLET",
        },
        customer: {
          phoneNumber: customer.phone?.replace(/\s/g, ""),
        },
        reference: orderNumber,
        returnUrl: `https://www.jmsprint.no/api/confirm-vipps-payment?orderNumber=${orderNumber}`,
        userFlow: "WEB_REDIRECT",
        paymentDescription: `Bestilling ${orderNumber}`,
      }),
    });

    const paymentData = await paymentResponse.json();

    if (!paymentResponse.ok) {
      throw new Error(JSON.stringify(paymentData));
    }

    return res.status(200).json({
      url: paymentData.redirectUrl,
      orderNumber,
    });
  } catch (error) {
    console.error("Vipps error:", error);
    return res.status(500).json({ error: error.message });
  }
}
