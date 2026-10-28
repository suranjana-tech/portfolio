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

## Portfolio navigation

The Tailwind-styled header stays sticky while scrolling and switches between
Home, Profile, Experience, and Contact without navigating away from the page.
Below the `md` breakpoint (768px), a menu button reveals the section controls.
Selecting a section closes the mobile menu; Escape closes it and returns focus
to the menu button. The current section is marked visually and with `aria-current`.
Contact is styled as a pine-green call-to-action with gold accents, a soft halo
that keeps pulsing while the tab is inactive, and a subtle hover lift. Its active
state stops the halo and uses a stronger gold outline. The cover's Download CV
glow and sheen also loop continuously.
Animations and movement respect reduced-motion preferences.
The cover leads with the role, three proof stats (5+ years, 19-app Nx platform,
42 countries), a Germany-availability chip, and two actions: a gold **Download CV**
button (highlighted with a three-pulse glow and sheen) and a secondary
"Explore my profile" button that opens Profile, brings About Me into view below the
sticky header, and moves keyboard focus to that heading.
Profile and experience sections also include viewport-triggered Tailwind motion:
the About/Professional Summary column slides in from the right, and skill bars
animate from 0% to their target values when scrolled into view. Metric, workflow,
stack, and achievement cards use staggered reveal transitions for a smoother
on-scroll experience.
GitHub Projects uses rounded white cards with a green-to-gold accent edge, a GitHub
icon tile, a language chip, and a staggered scroll-in. The whole card is one link
(opens in a new tab) and lifts on hover; the lift is disabled for reduced motion.
Professional Achievements sits on a pine gradient with two slowly drifting glows and
a gold accent bar that draws in on scroll. Each glass card has an icon tile, a
gold-gradient number that counts up (5+ Years, 3 Domains; screen readers get the
final text), a top accent line that draws in, and a gold spotlight that follows the
cursor on hover. Edit the `ACHIEVEMENTS` array in `page.tsx` to change the content.
The drifting glows, count-up, spotlight and lift are all disabled for reduced motion.
Current Role Impact and Performance Metrics use a shared `StatCard` component (see
`page.tsx`): rounded cards in a `gold`, `frost` (glass) or `pine` tone with an icon
tile, a count-up number, an accent line that draws in, and the same hover spotlight.
Delivery Workflow is a connected timeline of glass step cards with gold number tiles
and connector lines that draw in. To change a stat, edit its `<StatCard>` props
(`countTo`, `prefix`, `suffix`, `label`). Counters replay each time they scroll into view.
Technology Stack uses three rounded pine cards with a gold icon tile, a one-line
summary, and skill chips driven by the `STACK_GROUPS` array in `page.tsx` (edit that
list to change the tools). Cards and chips animate in on scroll, the card lifts with
a gold glow on hover, and chips highlight individually. Motion is off for reduced motion.

## Public CV and content accuracy

`public/Suranjana-Ghosh-CV.pdf` is the file behind the Download CV buttons. It is a
**redacted copy** of `Suranjana Ghosh_CV.pdf` with the date of birth and phone number
removed, so personal data is not published on the website. Create it again after
updating the original CV (redaction keeps the original untouched). The website's
public contact details are email, LinkedIn, and GitHub only.

Every figure on the site must trace back to the CV: 5+ years, 19 apps, 5-member
team, 3,000+ organizations in 42 countries, +20% performance, +30% rendering,
+20% data-fetching efficiency, and 4 languages. Do not add scores or percentages
that you cannot evidence.

## Contact form delivery (Google Form → your Gmail)

The on-site form (React Hook Form) posts to `/api/contact`. That server route forwards
each message to a **Google Form you own**, and Google Forms emails you a notification.
Visitors never leave the site and never see the Google Form. No domain or paid service
is needed.

**One-time setup (about 5 minutes):**

1. Go to <https://forms.google.com> and create a form with these questions, all
   **Short answer** except Message (use **Paragraph**): `Name`, `Email`, `Phone`, `Message`.
   Do not mark any as required, and do not turn on "Collect email addresses",
   "Limit to 1 response" or "Restrict to users in your organization" (these need a
   Google login and make submissions fail).
2. In the form's **Responses** tab, click **⋮ → Get email notifications for new responses**.
   Notifications go to the Gmail account that owns the form.
3. Click **Send → link icon** and copy the link (it ends in `/viewform`).
4. Find each question's entry id: open the form's **⋮ → Get pre-filled link**, type
   any value into every question, click **Get link**, and copy it. It looks like
   `...?entry.1111111111=Name&entry.2222222222=Email&entry.3333333333=Phone&entry.4444444444=Message`.
   The numbers after `entry.` are your ids.
5. Create `.env.local` in `portfolio-site/` (already ignored by Git):

   ```dotenv
   GOOGLE_FORM_URL=PASTE_THE_LINK_YOU_COPIED_FROM_GOOGLE_FORMS_HERE
   GOOGLE_FORM_ENTRY_NAME=entry.1111111111
   GOOGLE_FORM_ENTRY_EMAIL=entry.2222222222
   GOOGLE_FORM_ENTRY_PHONE=entry.3333333333
   GOOGLE_FORM_ENTRY_MESSAGE=entry.4444444444
   ```

   `GOOGLE_FORM_ENTRY_PHONE` is optional; name, email and message are required.
6. Restart `npm run dev`, send a test message, and check your Gmail (and Spam), plus the
   form's **Responses** tab. Add the same variables to your hosting provider (for example
   Vercel → Project → Settings → Environment Variables) and redeploy.

Visitors can also pick a topic (Job opportunity, Collaboration, Just saying hi). It is
added to the top of the Message field as `Topic: …`, so you can spot job opportunities
quickly. Edit the topics in `TOPICS` in both `src/components/contact-form.tsx` and
`src/app/api/contact/route.ts`.

**Behaviour to know about**

- Google answers `200` when it records a response. If the form is private or needs a
  login, Google redirects instead, and the site shows an error rather than claiming
  success. The form then offers an "email me directly" link that keeps what the
  visitor typed.
- If the Google variables are only partly set, the form shows "temporarily unavailable".
- **Corporate networks:** tools like Netskope or Zscaler re-sign HTTPS traffic with their
  own certificate. Windows trusts it, but Node.js does not, so the server log shows
  `Google Form could not be reached. { reason: 'SELF_SIGNED_CERT_IN_CHAIN' }` and visitors
  see "Message delivery is unavailable". This only affects local development on that
  network; deployed hosting is unaffected. Export your company's root certificate to a
  `.pem` file kept **outside** the project and start the dev server with
  `NODE_EXTRA_CA_CERTS` pointing at it (PowerShell:
  `$env:NODE_EXTRA_CA_CERTS='C:\path\to\root.pem'; npm run dev`). Never disable TLS
  verification with `NODE_TLS_REJECT_UNAUTHORIZED=0`.
- If Google answers **401**, the form requires a Google sign-in. In the form editor choose
  **Publish** and set responders to **Anyone with the link**, and turn off "Collect email
  addresses", "Limit to 1 response" and any organisation restriction. Test the form link in
  a private window; it must open without asking you to sign in.
- Gmail notifications can be delayed or land in Spam; the **Responses** tab is the
  source of truth. In Sheets, link the responses for a searchable inbox.
- Never prefix these variables with `NEXT_PUBLIC_` and never commit `.env.local`.
- The endpoint validates inputs, checks browser origin, caps the request size, and has
  a spam honeypot. Before exposing it publicly, configure rate limiting/bot protection at
  your hosting edge. It needs a Next.js server; a static export cannot run the API route.

**Alternative (Resend):** if `GOOGLE_FORM_URL` is not set, the route falls back to the
Resend email API. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (a sender on a domain
you have verified with Resend) instead. If neither is configured, the form shows an
unavailable message.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
