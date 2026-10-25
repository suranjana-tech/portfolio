This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact form email setup

The contact form uses React Hook Form and a server-side Resend API route.
Messages go to **suranjanaghosh2312@gmail.com**; replying uses the visitor's email.

1. Create a Resend account and verify a sender domain you own.
2. Create a sending API key.
3. Create `.env.local` in the project root (already ignored by Git):

   ```dotenv
   RESEND_API_KEY=your_resend_api_key
   CONTACT_FROM_EMAIL=Portfolio <contact@your-verified-domain.com>
   ```

4. Restart `npm run dev`. Add the same variables to your hosting provider and redeploy for production.
5. Submit the form and verify the message arrives in Gmail, checking Spam as well.

Never prefix these variables with `NEXT_PUBLIC_` or commit credentials.
Without configuration, the form shows an explicit unavailable message rather than
claiming the email was sent. Success means Resend accepted the email, not guaranteed
inbox delivery. Check Resend delivery logs if Gmail does not receive it.
The endpoint validates inputs, checks browser origin, and includes a spam honeypot.
Before exposing it publicly, configure rate limiting/bot protection at your hosting
edge to prevent automated email abuse. Requires a Next.js server; static export
alone cannot send email. Real delivery must be tested with your configured account.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
