import nodemailer from 'nodemailer';

export async function sendOtpEmail(to: string, code: string) {
  const enabled = (process.env.EMAIL_OTP_ENABLED ?? '0') === '1';
  if (!enabled) return;
  const host = process.env.SMTP_HOST!, port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER!, pass = process.env.SMTP_PASS!;
  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  await transporter.sendMail({
    from: `MGI Auth <${user}>`,
    to,
    subject: 'Your verification code',
    html: `<div style="font-family:Inter,system-ui,sans-serif;font-size:16px">
            <p>Your one-time code:</p>
            <div style="font-size:28px;font-weight:700;letter-spacing:4px">${code}</div>
            <p style="color:#666">It expires in 10 minutes.</p>
          </div>`
  });
}
