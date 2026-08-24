import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import authRouter from "./presentation/routes/auth.routes.js";
import patientRouter from "./presentation/routes/patient.routes.ts";
import adminRouter from "./presentation/routes/admin.routes.js";
import doctorRouter from "./presentation/routes/doctor.routes.ts";
import commonRouter from "./presentation/routes/common.routes.ts";
import connectDB from "./infrastructure/database/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./presentation/middlewares/error.middleware.js";
import path from "path";
import { fileURLToPath } from "url";
import { startCronJobs } from "./infrastructure/cron/index.js";
import passport from "./infrastructure/passport/passport.config.ts";
dotenv.config();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }),
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/common", commonRouter);

app.use(errorMiddleware);

connectDB()
  .then(() => {
    console.log(`Database Connected`);
    startCronJobs();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((e) => {
    throw new Error("Error Connecting to DB");
  });
