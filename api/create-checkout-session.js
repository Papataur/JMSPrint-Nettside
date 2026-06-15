import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { total, customer, cart } = await request.json();

    const orderNumber = `JMS-${Date.now()}`;

    await supabase.from("orders").insert([
      {
        order_number: orderNumber,
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        products: { items: cart },
        total_price: total,
        status: "Venter betaling",
      },
    ]);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      customer_email: customer.email,

      line_items: [
        {
          price_data: {
            currency: "nok",
            product_data: {
              name: `Bestilling ${orderNumber}`,
            },
            unit_amount: Math.round(Number(total) * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `https://www.jmsprint.no/?success=true&order=${orderNumber}`,
      cancel_url: `https://www.jmsprint.no/?cancel=true&order=${orderNumber}`,
    });

    return Response.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}