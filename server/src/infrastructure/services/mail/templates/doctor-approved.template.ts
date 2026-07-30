export const doctorApprovedTemplate = {
  subject: 'Your Doctor Profile Has Been Approved',
  body: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;">
      <h2 style="color:#8E44AD;">🎉 You're Approved!</h2>
      <p>Hi <strong>Dr. {{DOCTOR_NAME}}</strong>,</p>
      <p>Your profile has been reviewed and approved. You are now an active doctor on HealthCare.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
        <tr><td style="padding:8px 0;color:#555;width:130px;">Name</td><td>Dr. {{DOCTOR_NAME}}</td></tr>
        <tr><td style="padding:8px 0;color:#555;">Specialty</td><td>{{SPECIALTY}}</td></tr>
      </table>
      <p>Log in to your dashboard to set your availability and start receiving appointments.</p>
      <p>Welcome to the team!<br/><strong>The HealthCare Team</strong></p>
    </div>
  `,
};