import { resend } from "../plugins/resend.js";

// Email para ti
export async function sendContactEmail({ name, email, message }) {
    return await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "your@email.com",
        subject: "Nova mensagem de contacto",
        html: `
      <h2>Nova mensagem</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${message}</p>
    `
    });
}

// Auto-reply para o utilizador
export async function sendAutoReply({ name, email }) {
    return await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Recebemos a sua mensagem",
        html: `
      <p>Olá ${name},</p>

      <p><strong>ORIGINAL-CUT</strong></p>

      <p>Obrigado, recebemos o seu email.<br/>
      Em breve entraremos em contacto.</p>

      <p>Com os melhores cumprimentos,<br/>
      Equipa ORIGINAL-CUT</p>
    `
    });
}