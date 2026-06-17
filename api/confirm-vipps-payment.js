import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    const { orderNumber } = req.query;

    if (!orderNumber) {
      return res.status(400).json({
        error: "Mangler ordrenummer",
      });
    }

    const { error } = await supabase
      .from("orders")
      .update({
        status: "Betalt",
      })
      .eq("order_number", orderNumber);

    if (error) {
      throw error;
    }

    return res.redirect(
      `https://www.jmsprint.no/?vipps=success&order=${orderNumber}`
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
}
