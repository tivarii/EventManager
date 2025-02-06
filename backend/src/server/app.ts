import express, { Application, Express } from "express";
import "dotenv/config";
import authRoutes from "../routes/authRoutes";
import infoRoutes from "../routes/info.routes";
import eventRoutes from "../routes/eventRoutes";
import committeeRoutes from "../routes/committeeRoutes";
import qrRoutes from "../routes/qrRoutes";
import { errorHandler } from "../middlewares/errorHandler";
import cors from "cors";
import { error } from "console";

  export const app = express();
  app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true
  }));
  app.use(express.json({ limit: "3mb" }));

  app.use("/auth", authRoutes);
  app.use("/user", infoRoutes);
  app.use("/event", eventRoutes);
  app.use("/committee", committeeRoutes);
  app.use("/qrcode", qrRoutes);

  app.get("/", (req, res) => {
    res.status(200).json({ message: "up" });
  });

  app.use(errorHandler);


