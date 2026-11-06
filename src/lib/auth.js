import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { Resend } from 'resend';

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("AnisAuth");

const resend = new Resend(process.env.BETTER_AUTH_RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
    // requireEmailVerification: true,
    sendResetPassword: ({ user, url }) => {
      void resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: 'Reset your password',
        html: `Click <a href="${url}">here</a> to reset your password.`,
      });
    },
  }, 
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const data = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>', // <--- এখানে example.com এর বদলে resend.dev দিন
          to: user.email,
          subject: 'Verify your email address',
          html: `Click <a href="${url}">here</a> to verify your email.`,
        });
        console.log("Email sent successfully:", data);
      } catch (error) {
        console.error("Failed to send email:", error);
      }
    },
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 7*24*3600 // 7 days 
  },
  socialProviders: {
      google: { 
          clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID, 
          clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET, 
      }, 
      github: { 
          clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID, 
          clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET, 
      }, 
      discord: { 
          clientId: process.env.BETTER_AUTH_DISCORD_CLIENT_ID, 
          clientSecret: process.env.BETTER_AUTH_DISCORD_CLIENT_SECRET, 
      }, 
  },
  database: mongodbAdapter(db, {
    client,
  }),
});