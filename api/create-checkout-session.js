import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { total, customer, cart } = await request.json();

    const orderNumber = `JMS-${Date.now()}`;

    const varerTekst = cart
      .map(
        (item) =>
          `${item.quantity || 1}. ${item.name} - ${
            item.color || "Ukjent farge"
          } - ${item.price} kr`
      )
      .join("\n");

    const varerHtml = varerTekst.replace(/\n/g, "<br>");

    await supabase.from("orders").insert([
      {
        order_number: orderNumber,
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        products: {
          items: varerTekst,
        },
        total_price: total,
        status: "Venter betaling",
      },
    ]);

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

        <p>
          Vi begynner produksjonen så snart bestillingen er behandlet.
        </p>

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
      subject: `Ny kortbestilling ${orderNumber}`,
      html: `
        <h2>Ny kortbestilling på JMSPrint</h2>

        <p><strong>Ordrenummer:</strong> ${orderNumber}</p>
        <p><strong>Navn:</strong> ${customer.name}</p>
        <p><strong>Adresse:</strong> ${customer.address || "-"}</p>
        <p><strong>Postnummer:</strong> ${customer.postalCode || "-"}</p>
        <p><strong>Poststed:</strong> ${customer.city || "-"}</p>
        <p><strong>Telefon:</strong> ${customer.phone || "-"}</p>
        <p><strong>E-post:</strong> ${customer.email}</p>

        <p><strong>Varer:</strong><br>${varerHtml}</p>

        <p><strong>Total:</strong> ${total} kr</p>
      `,
    });

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