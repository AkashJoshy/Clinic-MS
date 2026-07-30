import { Router } from "express";
import { ADMIN_ENDPOINTS } from "../endpoints/admin.endpoints.js";
import { NodeMailerService } from "../../infrastructure/services/mail/NodeMailerService.ts";

const router = Router();

// DB Repo's


// Services
const nodeMailerService = new NodeMailerService();

// Service-Usecase

// Use-cases


// Controllers


// Routes


export default router;
