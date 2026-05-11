import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { expo } from "@better-auth/expo";
import { importPKCS8, SignJWT } from "jose";
import { prisma } from "./lib/prisma.js";
import { sendOtpEmail } from "./lib/email.js";

const trustedOrigins = [
  "kilocal://",
  "exp://",
  "https://appleid.apple.com",
  ...(process.env.TRUSTED_ORIGINS?.split(",").map((o) => o.trim()).filter(Boolean) ?? []),
];

// Apple "client secret" is a JWT signed with the .p8 private key. Apple caps
// the JWT lifetime at 6 months — regenerate on each boot so we never ship a
// container that's about to expire.
async function generateAppleClientSecret(): Promise<string | null> {
  const clientId = process.env.APPLE_CLIENT_ID;
  const teamId = process.env.APPLE_TEAM_ID;
  const keyId = process.env.APPLE_KEY_ID;
  const privateKey = process.env.APPLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientId || !teamId || !keyId || !privateKey) return null;

  const key = await importPKCS8(privateKey, "ES256");
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: keyId })
    .setIssuer(teamId)
    .setSubject(clientId)
    .setAudience("https://appleid.apple.com")
    .setIssuedAt(now)
    .setExpirationTime(now + 180 * 24 * 60 * 60)
    .sign(key);
}

const appleClientSecret = await generateAppleClientSecret();

const socialProviders =
  appleClientSecret && process.env.APPLE_CLIENT_ID
    ? {
        apple: {
          clientId: process.env.APPLE_CLIENT_ID,
          clientSecret: appleClientSecret,
          appBundleIdentifier: process.env.APPLE_APP_BUNDLE_IDENTIFIER,
        },
      }
    : undefined;

if (!socialProviders) {
  console.warn(
    "[auth] Apple sign-in disabled: set APPLE_CLIENT_ID, APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_PRIVATE_KEY to enable.",
  );
}

export const auth = betterAuth({
  appName: "Kilocal",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  trustedOrigins,
  emailAndPassword: { enabled: true },
  socialProviders,
  plugins: [
    expo(),
    emailOTP({
      otpLength: 6,
      expiresIn: 600,
      sendVerificationOTP: async ({ email, otp, type }) => {
        await sendOtpEmail({ to: email, otp, type });
      },
    }),
  ],
});
