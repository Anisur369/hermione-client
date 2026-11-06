import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from 'resend';

const resend = new Resend(process.env.BETTER_AUTH_RESEND_API_KEY);

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db('better-auth-db');

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    emailVerification: {
      sendVerificationEmail: async ( { user, url, token }, request) => {
        void resend.emails.send({
          from: "noreply@yourapp.com",
          to: user.email,
          subject: "Verify your email address",
          text: `Click the link to verify your email: ${url}`,
        });
      },
    },
  },
  socialProviders: {
      google: { 
          clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID, 
          clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET, 
      }, 
  },

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});