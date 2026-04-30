import { verifyTurnstile } from "../utils/verifyTurnstile.js";
import { sendContactEmail, sendAutoReply } from "../services/email.service.js";


export async function handleContact(req, reply) {

    console.log(req.body);

    const { name, email, message, token } = req.body;

    if (!name || !email || !message || !token) {
        return reply.status(400).send({ error: "Missing fields" });
    }

    const isValid = await verifyTurnstile(token);

    if (!isValid) {
        return reply.status(400).send({ error: "Invalid captcha" });
    }

    try {
        // 🔹 enviar em paralelo (mais rápido)
        await Promise.all([
            sendContactEmail({ name, email, message }),
            sendAutoReply({ name, email })
        ]);

        return reply.send({ success: true });

    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Failed to send message" });
    }
}