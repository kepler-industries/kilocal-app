import { Resend } from "resend";

// Loose string type — better-auth occasionally adds new OTP types (e.g.
// "change-email") in minor versions, and there's no value in narrowing here.
type OtpType = string;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const fromAddress = process.env.RESEND_FROM ?? "Kilocal <noreply@kilocal.app>";

const subjects: Record<string, string> = {
  "sign-in": "Ton code Kilocal",
  "email-verification": "Vérifie ton email Kilocal",
  "forget-password": "Réinitialise ton mot de passe Kilocal",
  "change-email": "Confirme ton nouvel email Kilocal",
};

const intros: Record<string, string> = {
  "sign-in": "Voici ton code pour te connecter à Kilocal.",
  "email-verification": "Voici ton code pour vérifier ton email.",
  "forget-password": "Voici ton code pour réinitialiser ton mot de passe.",
  "change-email": "Voici ton code pour confirmer ton nouvel email.",
};

const fallbackSubject = "Ton code Kilocal";
const fallbackIntro = "Voici ton code Kilocal.";

export async function sendOtpEmail(params: { to: string; otp: string; type: OtpType }) {
  const { to, otp, type } = params;

  if (!resend) {
    console.log(`[email:dev] OTP for ${to} (${type}): ${otp}`);
    return;
  }

  const subject = subjects[type] ?? fallbackSubject;
  const intro = intros[type] ?? fallbackIntro;
  const html = `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#FAF7F2;padding:32px;">
  <div style="max-width:440px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border:1px solid #EAEAEA;">
    <h1 style="margin:0 0 8px;color:#2B3140;font-size:22px;">Kilocal</h1>
    <p style="color:#5A6172;font-size:14px;margin:0 0 24px;">${intro}</p>
    <div style="font-family:ui-monospace,Menlo,monospace;font-size:34px;letter-spacing:10px;color:#2B3140;text-align:center;padding:16px;background:#F2FBE9;border-radius:12px;border:1.5px solid #D5EDB8;font-weight:700;">${otp}</div>
    <p style="color:#9AA0AC;font-size:12px;margin:20px 0 0;">Ce code expire dans 10 minutes. Si tu n'es pas à l'origine de cette demande, ignore cet email.</p>
  </div>
</body></html>`;

  const { error } = await resend.emails.send({ from: fromAddress, to, subject, html });
  if (error) {
    console.error(`[email] failed to send OTP to ${to}:`, error);
    throw new Error(`Failed to send OTP email: ${error.message ?? "unknown"}`);
  }
}
