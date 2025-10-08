import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import Database from "better-sqlite3"

const sqlite = new Database("./auth.db")

export const auth = betterAuth({
  database: sqlite,
  baseURL: process.env.BETTER_AUTH_URL || "https://katchill.vercel.app/api/auth",
  trustedOrigins: [
    "https://katchill.vercel.app",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [nextCookies()],
})

export type Session = typeof auth.$Infer.Session
