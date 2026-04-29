import Fastify from "fastify";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.route.js";

dotenv.config();

const app = Fastify({
    logger: true
});

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