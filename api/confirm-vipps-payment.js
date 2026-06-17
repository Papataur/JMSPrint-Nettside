import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    const { orderNumber } = req.query;

    if (!orderNumber) {
      return res.status(400).json({ error: "Mangler ordrenummer" });
    }

<<<<<<< HEAD
=======
    const { data: order, error: orderFetchError } = await supabase
      .from("orders")
      .select("total_price")
      .eq("order_number", orderNumber)
      .single();

    if (orderFetchError) throw orderFetchError;

    const captureAmount = Math.round(Number(order.total_price) * 100);

>>>>>>> 9fe8ad1 (Fix dynamic Vipps capture amount)
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

<<<<<<< HEAD
    const { data: order, error: orderFetchError } = await supabase
      .from("orders")
      .select("total_price")
      .eq("order_number", orderNumber)
      .single();

    if (orderFetchError) throw orderFetchError;

    const captureAmount = Math.round(Number(order.total_price) * 100);

=======
>>>>>>> 9fe8ad1 (Fix dynamic Vipps capture amount)
    const captureResponse = await fetch(
      `https://api.vipps.no/epayment/v1/payments/${orderNumber}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
          "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY,
          "Merchant-Serial-Number": process.env.VIPPS_MSN,
          "Idempotency-Key": `${orderNumber}-capture`,
          "Vipps-System-Name": "JMSPrint",
          "Vipps-System-Version": "1.0.0",
          "Vipps-System-Plugin-Name": "JMSPrint checkout",
          "Vipps-System-Plugin-Version": "1.0.0",
        },
        body: JSON.stringify({
          modificationAmount: {
            currency: "NOK",
            value: captureAmount,
          },
        }),
      }
    );

    const captureData = await captureResponse.json();

    if (!captureResponse.ok) {
      throw new Error(JSON.stringify(captureData));
    }

    const { error } = await supabase
      .from("orders")
      .update({ status: "Betalt" })
      .eq("order_number", orderNumber);

    if (error) throw error;

    return res.redirect(
      `https://www.jmsprint.no/betaling-fullfort?order=${orderNumber}`
    );
  } catch (error) {
    console.error("Vipps capture error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
}