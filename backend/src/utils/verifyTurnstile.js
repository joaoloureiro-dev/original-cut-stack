import axios from "axios";
import { env } from "../config/env.js";

export async function verifyTurnstile(token) {
    try {
        const response = await axios.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                secret: env.TURNSTILE_SECRET_KEY,
                response: token
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.success;
    } catch (error) {
        console.error("Turnstile verification error:", error);
        return false;
    }
}