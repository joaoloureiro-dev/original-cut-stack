import axios from "axios";
import { env } from "../config/env.js";

export async function verifyTurnstile(token) {
    try {
        const params = new URLSearchParams();

        params.append("secret", env.TURNSTILE_SECRET_KEY.trim());
        params.append("response", token);

        const response = await axios.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        console.log("TURNSTILE RESPONSE:", response.data);

        return response.data.success;

    } catch (error) {
        console.error("TURNSTILE ERROR:", error.response?.data || error.message);
        return false;
    }
}