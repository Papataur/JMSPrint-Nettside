import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
const resend = new Resend(process.env.RESEND_API_KEY);
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
    const varerHtml = varerTekst.replace(/\n/g, "<br>");

await resend.emails.send({
  from: "JMSPrint <kontakt@jmsprint.no>",
  to: customer.email,
  subject: `Ordrebekreftelse ${orderNumber}`,
  html: `
    <div style="text-align:center; margin-bottom:20px;">
      <img src="https://www.jmsprint.no/JMSPrint.jpg" alt="JMSPrint" width="240">
    </div>

    <h2>🎉 Takk for bestillingen hos JMSPrint!</h2>

    <p>Hei ${customer.name},</p>
    <p>Vi har mottatt bestillingen din.</p>

    <p><strong>Ordrenummer:</strong> ${orderNumber}</p>
    <p><strong>Varer:</strong><br>${varerHtml}</p>

    <p><strong>Frakt:</strong> 69 kr</p>
    <p><strong>Total:</strong> ${total} kr</p>

    <p>📦 <strong>Forventet leveringstid:</strong> 2–5 virkedager</p>

    <p>Vi begynner produksjonen så snart bestillingen er behandlet.</p>

    <p>
      Med vennlig hilsen<br><br>
      <strong>JMSPrint</strong><br>
      Praktiske 3D-printede løsninger<br><br>
      kontakt@jmsprint.no<br>
      www.jmsprint.no
    </p>
  `,
});

await resend.emails.send({
  from: "JMSPrint <kontakt@jmsprint.no>",
  to: "kontakt@jmsprint.no",
  subject: `Ny Vipps-bestilling ${orderNumber}`,
  html: `
    <h2>Ny Vipps-bestilling på JMSPrint</h2>

    <p><strong>Ordrenummer:</strong> ${orderNumber}</p>
    <p><strong>Navn:</strong> ${customer.name}</p>
    <p><strong>Adresse:</strong> ${customer.address || "-"}</p>
    <p><strong>Postnummer:</strong> ${customer.postalCode || "-"}</p>
    <p><strong>Poststed:</strong> ${customer.city || "-"}</p>
    <p><strong>Telefon:</strong> ${customer.phone || "-"}</p>
    <p><strong>E-post:</strong> ${customer.email}</p>

    <p><strong>Varer:</strong><br>${varerHtml}</p>
    <p><strong>Total:</strong> ${total} kr</p>
    <p><strong>Status:</strong> Venter Vipps</p>
  `,
});

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
