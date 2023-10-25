import dotenv from "dotenv";
import express from "express";
import next from "next";
import nextBuild from "next/dist/build";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets
app.use("/assets", express.static(path.resolve(__dirname, "./assets")));

// Import and use routers
import calRouter from "./routes/calRouter";
app.use("/cal", calRouter);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

app.use("/assets", express.static(path.resolve(__dirname, "./assets")));

import { getPayloadClient } from "./getPayload";

const start = async (): Promise<void> => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (newPayload) => {
        newPayload.logger.info(
          `Payload Admin URL: ${newPayload.getAdminURL()}`
        );
      },
    },
  });

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`);
      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"));
      process.exit();
    });

    return;
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
  });

  const nextHandler = nextApp.getRequestHandler();

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
