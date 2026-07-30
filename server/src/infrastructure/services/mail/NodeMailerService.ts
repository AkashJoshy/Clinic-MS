import nodemailer from "nodemailer";
import type { IMailService } from "../../../domain/services/EmailService.ts";
import dotenv from "dotenv";
dotenv.config();

const platformMail = process.env.PLATFORM_MAIL;
const platformPass = process.env.PLATFORM_PASS;

export class NodeMailerService implements IMailService {
  private transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: platformMail,
      pass: platformPass,
    },
  });

  async sendMail(
    to: string,
    subject: string,
    body: string,
    otp?: string,
  ): Promise<boolean | undefined> {
    try {
      if (otp) {
        body = body.replace("{{OTP}}", otp);
      }
      await this.transporter.sendMail({
        from: platformMail,
        to,
        subject,
        html: body,
      });
      return true;
    } catch (error: any) {
      throw new Error("Mail sending failed", error?.message);
    }
  }
}
