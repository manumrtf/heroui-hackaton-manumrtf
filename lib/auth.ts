import { betterAuth } from "better-auth";
import { Polar } from "@polar-sh/sdk";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();

import { checkout, polar, portal } from "@polar-sh/better-auth";
import { Resend } from "resend";

import { PrismaClient } from "@/generated/prisma";
import VerificationEmail from "@/emails/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  // Use 'sandbox' if you're using the Polar Sandbox environment
  // Remember that access tokens, products, etc. are completely separated between environments.
  // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
  server: "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    async sendVerificationEmail(data) {
      const { data: emailData, error } = await resend.emails.send({
        from: "auth@heroui-hackaton.manumrtf.com",
        to: [data.user.email],
        subject: "Verify your email",
        react: VerificationEmail({
          url: data.url,
          email: data.user.email,
        }),
      });

      if (error) {
        return console.error(error);
      }
      console.log(emailData);
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,

      use: [
        checkout({
          successUrl: "/success?checkout_id={CHECKOUT_ID}",
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
  ],
});
