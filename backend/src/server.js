import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";

dotenv.config();

const app = Fastify({
    logger: true
});

// ✅ AQUI — registar plugins
await app.register(cors, {
    origin: true
});

// ✅ depois as routes
import contactRoutes from "./routes/contact.route.js";
app.register(contactRoutes);

app.get("/", async () => {
    return { status: "ok" };
});

const start = async () => {
    try {
        await app.listen({
            port: process.env.PORT || 3000,
            host: "0.0.0.0"
        });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();