# Mohamed's Digital Vibe

Build a mobile-first digital business card page for Mohamed Ismail — a 21-year-old solo founder and technologist based in Nairobi, Kenya.

---

DESIGN DIRECTION:
Bold, expressive, and full of personality — but still polished and founder-grade. Think rich color, strong typographic contrast, and kinetic energy. Use a deep near-black base (#0D0D0D) with vibrant accent colors — electric amber (#F5A623) and a bright coral or electric teal as a secondary pop. Fonts: Bebas Neue or Clash Display for the name/headings (big, confident, loud), paired with DM Sans for body text and labels. The card should feel alive — like it belongs to someone building things that matter. Not a template. Not a portfolio. A statement.

Staggered entrance animations on load — each section slides up and fades in with slight delay. Micro-interactions on link taps (subtle scale or glow).

Mobile viewport ~390px. Must look immaculate on a phone screen. On desktop, center the card at max-width 430px with the rest of the screen as a dark backdrop.

---

PERSONAL INFO:

Name: Mohamed Ismail
Title: Founder & Builder
Company: Hisako Technologies
Location: Nairobi, Kenya

Bio (display this verbatim):
"21-year-old founder building software and systems from Nairobi. I create tools that solve real problems — for African businesses and global markets. Currently shipping multiple products under Hisako Technologies."

---

VENTURES (display as bold stacked cards with accent color left-border or top stripe):

1. VendoFlow( link to https://vendoflow.com)
   Type: B2B SaaS
   Description: POS and inventory management built for Kenyan fashion boutiques.
   Accent: Amber

2. Passr (link to https://passr.eu)
   Type: Compliance SaaS
   Description: Digital Product Passport platform helping outdoor and activewear brands meet EU regulations.
   Accent: Teal or coral

3. Hisako Studio
   Type: Creative Production
   Description: A full-service creative production studio based in Nairobi — brand, photography, and content.
   Accent: Muted warm white or silver

---

CONTACT / SOCIAL LINKS (bold pill buttons or icon rows, fully tappable):

- Email: ismail@hisako.eu (mailto link)
- LinkedIn: www.linkedin.com/in/mohamedhisako
- WhatsApp: wa.me/254746110785
- Website: ismail.hisako.eu

All links open in new tab. WhatsApp link should use the wa.me format.

---

FOOTER:
Small text at the very bottom: "© Hisako Technologies · Nairobi"

---

TECHNICAL REQUIREMENTS:
- React + Tailwind CSS
- Load Google Fonts: Clash Display (or Bebas Neue) + DM Sans
- All content is static — no APIs or data fetching
- Staggered CSS animation on mount for each section (fade + translateY)
- Hover/tap states on all interactive elements
- Page title: "Hisako — Founder & Builder"
- No scrolling required if content fits; if it doesn't, smooth scroll with no visible scrollbar

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dc329a25-b1d7-4b68-9eef-5849250a469b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
