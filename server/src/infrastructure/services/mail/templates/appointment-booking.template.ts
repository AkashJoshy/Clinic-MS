export const appointmentBookedTemplate = {
  subject: 'Appointment Confirmed',
  body: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;">
      <h2 style="color:#27AE60;">✅ Appointment Confirmed</h2>
      <p>Hi <strong>{{PATIENT_NAME}}</strong>,</p>
      <p>Your appointment has been booked successfully. Here are your details:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
        <tr><td style="padding:8px 0;color:#555;width:130px;">Doctor</td><td>Dr. {{DOCTOR_NAME}}</td></tr>
        <tr><td style="padding:8px 0;color:#555;">Specialty</td><td>{{SPECIALTY}}</td></tr>
        <tr><td style="padding:8px 0;color:#555;">Date</td><td>{{DATE}}</td></tr>
        <tr><td style="padding:8px 0;color:#555;">Time</td><td>{{TIME}}</td></tr>
      </table>
      <p>Please arrive 10–15 minutes early.</p>
      <p>Best regards,<br/><strong>The HealthCare Team</strong></p>
    </div>
  `,
};