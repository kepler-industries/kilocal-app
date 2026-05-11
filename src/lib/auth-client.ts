import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import { emailOTPClient } from "better-auth/client/plugins";
import * as SecureStore from "expo-secure-store";

// EXPO_PUBLIC_API_URL is injected at bundle time (Expo reads any
// EXPO_PUBLIC_* var from .env). Fall back to localhost for the simulator.
const baseURL =
  process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    expoClient({
      scheme: "kilocal",
      storagePrefix: "kilocal",
      storage: SecureStore,
    }),
    emailOTPClient(),
  ],
});

export const { useSession, signIn, signUp, signOut } = authClient;
