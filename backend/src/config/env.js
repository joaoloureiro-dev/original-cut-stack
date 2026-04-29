import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || 3000,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY
};