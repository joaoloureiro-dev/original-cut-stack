import { handleContact } from "../controllers/contact.controller.js";

export default async function contactRoutes(fastify) {
    fastify.post("/contact", handleContact);
}