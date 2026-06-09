import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Kun POST er tillatt" });
  }

  try {
    const { ordrenummer, navn, postnummer, poststed, adresse, telefon, email, varer, total } = req.body;

    if (!ordrenummer || !navn || !email || !varer || !total) {
      return res.status(400).json({ error: "Mangler nødvendig informasjon" });
    }

    const varerHtml = String(varer).replace(/\n/g, "<br>");

    await resend.emails.send({
      from: "JMSPrint <kontakt@jmsprint.no>",
      to: email,
      subject: `Ordrebekreftelse ${ordrenummer}`,
      html: `
        <h2>🎉 Takk for bestillingen hos JMSPrint!</h2>
        <p>Hei ${navn},</p>
        <p>Vi har mottatt bestillingen din.</p>
        <p><strong>Ordrenummer:</strong> ${ordrenummer}</p>
        <p><strong>Varer:</strong><br>${varerHtml}</p>
        <p><strong>Frakt:</strong> 69 kr</p>
        <p><strong>Total:</strong> ${total}</p>

        <p>📦 <strong>Forventet leveringstid:</strong> 2–5 virkedager</p>
       
        <p>
        Vi begynner produksjonen så snart bestillingen er behandlet.<br>
        Har du spørsmål kan du svare direkte på denne e-posten.
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
      subject: `Ny bestilling ${ordrenummer}`,
      html: `
        <h2>Ny bestilling på JMSPrint</h2>
        <p><strong>Ordrenummer:</strong> ${ordrenummer}</p>
        <p><strong>Navn:</strong> ${navn}</p>
        <p><strong>Adresse:</strong> ${adresse || "-"}</p>
        <p><strong>Postnummer:</strong> ${postnummer}</p>
        <p><strong>Poststed:</strong> ${poststed}</p>
        <p><strong>Telefon:</strong> ${telefon || "-"}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Varer:</strong><br>${varerHtml}</p>
        <p><strong>Total:</strong> ${total}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Send order error:", error);
    return res.status(500).json({ error: "Kunne ikke sende e-post" });
  }
}
