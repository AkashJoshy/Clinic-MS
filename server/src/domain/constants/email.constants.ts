import type { EntityType } from "../types/user.types.ts";

export const EMAIL_SUBJECTS = {
  WELCOME: "Welcome to Heathixia Care",
  RESET_PASSWORD: "Reset Your Password",
  OTP_VERIFY: "Your OTP Verification Code",
  ACCOUNT_BLOCKED: "Your Account Has Been Blocked",
  CLINIC_APPROVED: "Your Clinic Has Been Approved 🎉",
  CLINIC_REJECTED: "Your Clinic Registration Was Rejected ❌",
  DOCTOR_APPROVED: "Your Registration Has Been Approved 🎉",
  DOCTOR_REJECTED: "Your Registration Has Been Rejected ❌",
} as const;

export const EMAIL_BODY = {
  WELCOME:
    "<h1>Welcome!</h1><p>Your account has been created successfully.</p>",
  RESET_PASSWORD:
    "<h1>Reset Password</h1><p>Click the link below to reset your password.</p>",
  OTP_VERIFY:
    "<h1>OTP Verification</h1><p>Your OTP code is: <strong>{{OTP}}</strong></p>",
  ACCOUNT_BLOCKED:
    "<h1>Account Blocked</h1><p>Your account has been blocked. Contact support.</p>",
} as const;

export const EMAIL_FOOTER = {
  FOOTER1: "<p>Best regards,<br/><strong>The Healthixia Team</strong></p>",
  FOOTER_DOCTOR: "<p>Best regards,<br/><strong>clinicName</strong></p>",
};

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "You are not authorized",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  SOMETHING_WENT_WRONG: "Something went wrong, please try again",
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  REGISTER_SUCCESS: "Registration successful",
  EMAIL_SENT: "Email sent successfully",
  PASSWORD_UPDATED: "Password updated successfully",
} as const;

export const APPROVED_MESSAGE = (
  name: string,
  entityType: EntityType,
) => 
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registration Approved</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f7f6;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2937;
  "
>
  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="background-color: #f4f7f6; padding: 40px 16px;"
  >
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                padding: 28px 32px;
                background-color: #1dc465;
              "
            >
              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 22px;
                  font-weight: 700;
                "
              >
                Healthixia Care
              </h1>

              <p
                style="
                  margin: 6px 0 0;
                  color: #eafff1;
                  font-size: 13px;
                "
              >
                Registration Update
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 36px 32px;">

              <h2
                style="
                  margin: 0 0 20px;
                  color: #111827;
                  font-size: 22px;
                  line-height: 1.4;
                "
              >
                Registration Approved
              </h2>

              <p
                style="
                  margin: 0 0 16px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #374151;
                "
              >
                Hello <strong>${name}</strong>,
              </p>

              <p
                style="
                  margin: 0 0 20px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #374151;
                "
              >
                Welcome to <strong>Healthixia Care</strong>!
              </p>

              <!-- Success Message -->
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  margin-bottom: 24px;
                  background-color: #f0fdf4;
                  border-left: 4px solid #1dc465;
                "
              >
                <tr>
                  <td style="padding: 18px 20px;">

                    <p
                      style="
                        margin: 0 0 8px;
                        color: #166534;
                        font-size: 14px;
                        font-weight: 700;
                      "
                    >
                      ✓ Registration Approved
                    </p>

                    <p
                      style="
                        margin: 0;
                        color: #374151;
                        font-size: 14px;
                        line-height: 1.7;
                      "
                    >
                      We’re pleased to inform you that your
                      ${entityType.toLowerCase()} has been successfully
                      approved.
                    </p>

                  </td>
                </tr>
              </table>

              <p
                style="
                  margin: 0 0 20px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #374151;
                "
              >
                You can now access your dashboard and start using all
                available features.
              </p>

              <p
                style="
                  margin: 0 0 28px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #374151;
                "
              >
                We’re excited to have you onboard
                <span style="font-size: 18px;">🚀</span>
              </p>

              <p
                style="
                  margin: 0;
                  font-size: 14px;
                  line-height: 1.7;
                  color: #4b5563;
                "
              >
                Regards,<br />
                <strong style="color: #374151;">
                  Healthixia Care Team
                </strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding: 22px 32px;
                background-color: #f8faf9;
                border-top: 1px solid #e5e7eb;
              "
            >
              <p
                style="
                  margin: 0;
                  color: #9ca3af;
                  font-size: 11px;
                  line-height: 1.6;
                "
              >
                This is an automated email from Healthixia Care.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;


export const DOCTOR_REJECTED_MESSAGE = (
  fullName: string,
  reviewMessage: string,
  reapplicationLink: string,
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Doctor Registration Review</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f7f6;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2937;
  "
>
  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="background-color: #f4f7f6; padding: 40px 16px;"
  >
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                padding: 28px 32px;
                background-color: #1dc465;
              "
            >
              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 22px;
                  font-weight: 700;
                "
              >
                Healthixia Care
              </h1>

              <p
                style="
                  margin: 6px 0 0;
                  color: #eafff1;
                  font-size: 13px;
                "
              >
                Doctor Registration
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 36px 32px;">

              <h2
                style="
                  margin: 0 0 20px;
                  color: #111827;
                  font-size: 22px;
                  line-height: 1.4;
                "
              >
                Registration Requires Changes
              </h2>

              <p
                style="
                  margin: 0 0 16px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #374151;
                "
              >
                Hi <strong>${fullName}</strong>,
              </p>

              <p
                style="
                  margin: 0 0 20px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #374151;
                "
              >
                Thank you for registering as a doctor with
                <strong>Healthixia Care</strong>.
              </p>

              <p
                style="
                  margin: 0 0 24px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #374151;
                "
              >
                After reviewing your registration, we’re unable to approve
                it in its current form. Please review the feedback below and
                make the required changes.
              </p>

              <!-- Review Message -->
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  margin-bottom: 28px;
                  background-color: #f8faf9;
                  border-left: 4px solid #1dc465;
                "
              >
                <tr>
                  <td style="padding: 18px 20px;">

                    <p
                      style="
                        margin: 0 0 8px;
                        color: #111827;
                        font-size: 14px;
                        font-weight: 700;
                      "
                    >
                      Review Message
                    </p>

                    <p
                      style="
                        margin: 0;
                        color: #4b5563;
                        font-size: 14px;
                        line-height: 1.7;
                      "
                    >
                      ${reviewMessage}
                    </p>

                  </td>
                </tr>
              </table>

              <p
                style="
                  margin: 0 0 24px;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #374151;
                "
              >
                You can review the required changes and re-submit your
                registration using the secure link below.
              </p>

              <!-- CTA -->
              <table
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="margin: 0 auto 28px;"
              >
                <tr>
                  <td
                    align="center"
                    style="
                      border-radius: 8px;
                      background-color: #1dc465;
                    "
                  >
                    <a
                      href="${reapplicationLink}"
                      target="_blank"
                      style="
                        display: inline-block;
                        padding: 13px 24px;
                        color: #ffffff;
                        background-color: #1dc465;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 700;
                        text-decoration: none;
                      "
                    >
                      Review &amp; Re-submit Registration
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback Link -->
              <p
                style="
                  margin: 0 0 8px;
                  color: #6b7280;
                  font-size: 12px;
                  line-height: 1.5;
                "
              >
                If the button above doesn’t work, copy and paste this link
                into your browser:
              </p>

              <p
                style="
                  margin: 0 0 28px;
                  font-size: 12px;
                  line-height: 1.6;
                  word-break: break-all;
                "
              >
                <a
                  href="${reapplicationLink}"
                  target="_blank"
                  style="
                    color: #159947;
                    text-decoration: underline;
                  "
                >
                  ${reapplicationLink}
                </a>
              </p>

              <p
                style="
                  margin: 0 0 16px;
                  font-size: 14px;
                  line-height: 1.7;
                  color: #4b5563;
                "
              >
                Please make the necessary corrections and submit your
                registration again for review.
              </p>

              <p
                style="
                  margin: 0;
                  font-size: 14px;
                  line-height: 1.7;
                  color: #4b5563;
                "
              >
                If you have any questions, please contact our support team.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding: 22px 32px;
                background-color: #f8faf9;
                border-top: 1px solid #e5e7eb;
              "
            >
              <p
                style="
                  margin: 0;
                  color: #6b7280;
                  font-size: 12px;
                  line-height: 1.6;
                "
              >
                Regards,<br />
                <strong style="color: #374151;">
                  Healthixia Care Team
                </strong>
              </p>

              <p
                style="
                  margin: 12px 0 0;
                  color: #9ca3af;
                  font-size: 11px;
                "
              >
                This is an automated email. Please do not reply directly.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;

export const DOCTOR_APPROVED = (email: string) => {
  const setPasswordUrl = `${process.env.CLIENT_ORIGIN}/doctor/forgot-password`;
  const loginUrl = `${process.env.CLIENT_ORIGIN}/doctor`;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to the Doctor Portal</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f5f7; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7; padding: 32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background-color:#2563eb; padding: 24px 32px;">
                <h1 style="margin:0; color:#ffffff; font-size: 20px;">Welcome to the Clinic</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px;">
                <p style="margin:0 0 16px; color:#374151; font-size: 15px; line-height: 1.6;">
                  We are pleased to have you join our clinic and look forward to working with you in providing excellent care to our patients.
                </p>

                <p style="margin:0 0 16px; color:#374151; font-size: 15px; line-height: 1.6;">
                  Your doctor portal account has been created successfully. To complete your account setup, please create your password using the button below:
                </p>

                <!-- Set Password Button -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                  <tr>
                    <td style="border-radius: 6px; background-color:#2563eb;">
                      <a href="${setPasswordUrl}"
                         target="_blank"
                         style="display:inline-block; padding: 12px 24px; font-size: 15px; color:#ffffff; text-decoration:none; font-weight: 600;">
                        Set Your Password
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 16px; color:#374151; font-size: 15px; line-height: 1.6;">
                  <strong>Login Email/Username:</strong> ${email}
                </p>

                <p style="margin:0 0 16px; color:#374151; font-size: 15px; line-height: 1.6;">
                  Once your password has been created, you may log in to the doctor portal using your registered email address.
                </p>

                <p style="margin:0 0 16px; color:#374151; font-size: 15px; line-height: 1.6;">
                  For security purposes, email verification will be required during your first login to activate your account.
                </p>

                <!-- Login Portal Link -->
                <p style="margin:0 0 16px; color:#374151; font-size: 15px; line-height: 1.6;">
                  Doctor Login Portal:
                  <a href="${loginUrl}" target="_blank" style="color:#2563eb; text-decoration: underline;">
                    ${loginUrl}
                  </a>
                </p>

                <p style="margin:0 0 16px; color:#374151; font-size: 15px; line-height: 1.6;">
                  Through the doctor portal, you will be able to manage appointments, access patient-related information, and stay updated with clinic activities.
                </p>

                <p style="margin:0 0 16px; color:#374151; font-size: 15px; line-height: 1.6;">
                  If you experience any issues during account setup or login, please contact the clinic administrator for assistance.
                </p>

                <p style="margin: 24px 0 0; color:#374151; font-size: 15px; line-height: 1.6;">
                  We are excited to have you as part of our team.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px 32px; background-color:#f9fafb; border-top: 1px solid #e5e7eb;">
                <p style="margin:0; color:#9ca3af; font-size: 12px; line-height: 1.5;">
                  This is an automated message. If you did not expect this email, please contact the clinic administrator.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
