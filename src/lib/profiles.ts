export type ProfileKey = "maxamad" | "harith";

export type Profile = {
  key: ProfileKey;
  first: string;
  last: string;
  fullName: string;
  role: string;
  bio: string;
  email: string;
  linkedinUrl: string;
  linkedinLabel: string;
  whatsappDisplay: string;
  whatsappNumber: string;
  websiteDomain: string;
  websiteUrl: string;
  metaTitle: string;
  metaDescription: string;
  vcfFileName: string;
};

export const profiles: Record<ProfileKey, Profile> = {
  maxamad: {
    key: "maxamad",
    first: "Maxamad",
    last: "Ismacil",
    fullName: "Maxamad Ismacil",
    role: "Founder & Builder",
    bio: "21-year-old founder building software and systems from Nairobi. I create tools that solve real problems — for African businesses and global markets. Currently shipping multiple products under Hisako Technologies.",
    email: "ismail@hisako.eu",
    linkedinUrl: "https://www.linkedin.com/in/mohamedhisako",
    linkedinLabel: "mohamedhisako",
    whatsappDisplay: "+254 746 110 785",
    whatsappNumber: "254746110785",
    websiteDomain: "ismail.hisako.eu",
    websiteUrl: "https://ismail.hisako.eu",
    metaTitle: "Hisako — Founder & Builder",
    metaDescription:
      "Maxamad Ismacil — 21-year-old founder building software and systems from Nairobi under Hisako Technologies.",
    vcfFileName: "Maxamad-Ismacil.vcf",
  },
  harith: {
    key: "harith",
    first: "Harith",
    last: "Isman",
    fullName: "Harith Isman",
    role: "Management",
    bio: "21-year-old co-founder managing operations and partnerships at Hisako Technologies from Nairobi — keeping our products, studio, and people moving in the same direction.",
    email: "harith@hisako.eu",
    linkedinUrl: "https://www.linkedin.com/in/harith-isman-32789b40b/",
    linkedinLabel: "harith-isman-32789b40b",
    whatsappDisplay: "+254 792 235 781",
    whatsappNumber: "254792235781",
    websiteDomain: "harith.hisako.eu",
    websiteUrl: "https://harith.hisako.eu",
    metaTitle: "Hisako — Management",
    metaDescription:
      "Harith Isman — 21-year-old co-founder managing operations at Hisako Technologies, Nairobi.",
    vcfFileName: "Harith-Isman.vcf",
  },
};

export type Venture = {
  name: string;
  type: string;
  desc: string;
  accent: "amber" | "teal" | "silver";
  href?: string;
};

export const ventures: Venture[] = [
  {
    name: "VendoFlow",
    type: "B2B SaaS",
    desc: "POS and inventory management built for Kenyan fashion boutiques.",
    accent: "amber",
    href: "https://vendoflow.com",
  },
  {
    name: "Passr",
    type: "Compliance SaaS",
    desc: "Digital Product Passport platform helping outdoor and activewear brands meet EU regulations.",
    accent: "teal",
    href: "https://passr.eu",
  },
  {
    name: "Hisako Studio",
    type: "Creative Production",
    desc: "A full-service creative production studio based in Nairobi — brand, photography, and content.",
    accent: "silver",
    href: "https://hisako.eu",
  },
];

export const workUrl = "https://hisako.eu/work";
