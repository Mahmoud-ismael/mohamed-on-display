# AGENTS.md

## Architecture rules
- The index card serves two people from one deployment: the profile is chosen server-side by request host (harith.* → Harith Isman, any other host → Maxamad Ismacil) via `getProfileKey` in `src/lib/profile.functions.ts`. Why: each founder's custom domain must show their own card with correct SEO metadata, with no client-side flash.
- Profile data (names, contacts, bios, vCards) lives only in `src/lib/profiles.ts`; shared content (ventures, work link) is exported from the same module. Why: adding a founder or editing a contact should never require touching the route component.
