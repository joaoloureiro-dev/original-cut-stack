import Fastify from "fastify";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({
    logger: true
});

app.get("/", async (req, reply) => {
    return { status: "ok" };
});

const start = async () => {
    try {
        await app.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
        console.log("Server running");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();