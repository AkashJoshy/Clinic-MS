import { EMAIL_SUBJECTS } from "../../../../domain/constants/email.constants.ts";

export const otpVerifyTemplate = {
  subject: `${EMAIL_SUBJECTS.OTP_VERIFY}`,
  body: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;">
      <h2 style="color:#4A90E2;">Verify your email</h2>
      <p>Your OTP code is: <strong>{{OTP}}</strong> </p>
      <p>Please verify your email to continue.</p>
      <a href="{{VERIFY_URL}}"
        style="display:inline-block;padding:10px 16px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:6px;">
        Verify Email
      </a>
      <p style="margin-top:24px;font-size:13px;color:#888;">
        This link will expire in 24 hours. If you didn't create an account, you can ignore this email.
      </p>
    </div>
  `,
};