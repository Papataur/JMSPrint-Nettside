import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { total } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "nok",
            product_data: {
              name: "Bestilling hos JMSPrint",
            },
            unit_amount: Math.round(Number(total) * 100),
          },
          quantity: 1,
        },
      ],

      success_url: "https://www.jmsprint.no/?success=true",
      cancel_url: "https://www.jmsprint.no/?cancel=true",
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