import { EMAIL_SUBJECTS } from "../../../../domain/constants/email.constants.ts";

export const welcomeTemplate = {
  subject: `${EMAIL_SUBJECTS.WELCOME}`,
  body: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;">
      <h2 style="color:#4A90E2;">Welcome aboard! 👋</h2>
      <p>Hi <strong>{{NAME}}</strong>,</p>
      <p>Your account has been successfully created. We're glad to have you on HealthCare.</p>
      <p>You can now book appointments and connect with verified doctors.</p>
    </div>
  `,
};