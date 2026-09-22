export const SITE = {
  name: "Charam",
  tagline: "Giving gratitude a purpose",
  founderName: "Narendra Gore & Ajay Gandhe",
  founderRole: "Founders & Trustees, Charam",
  email: "Naren@atmakosh.com",
};

export type Currency = "USD" | "INR";

export interface Tier {
  usd: number;
  inr: number;
  title: string;
  funds: string;
}

export const TIERS: Tier[] = [
  {
    usd: 60,
    inr: 5000,
    title: "A school kit",
    funds: "Uniforms, books, shoes, and supplies for one girl's school year.",
  },
  {
    usd: 250,
    inr: 21000,
    title: "A year of tuition",
    funds: "Twelve months of school fees at one of our partner schools.",
  },
  {
    usd: 400,
    inr: 33000,
    title: "A full sponsorship",
    funds: "Tuition, kit, and access to computer and science labs for one year.",
  },
];

export interface Charity {
  name: string;
  blurb: string;
  url: string;
}

export const CHARITIES: Charity[] = [
  {
    name: "Project Nanhi Kali",
    blurb:
      "K.C. Mahindra Education Trust programme sponsoring underprivileged girls through ten years of schooling, with progress reports for every sponsor.",
    url: "https://donor.nanhikali.org",
  },
  {
    name: "Educate Girls",
    blurb:
      "Mobilizes community volunteers across rural India to find, enroll, and retain out-of-school girls.",
    url: "https://www.educategirls.ngo",
  },
  {
    name: "Room to Read",
    blurb:
      "Girls' education and literacy programmes helping girls complete secondary school with strong life skills.",
    url: "https://www.roomtoread.org",
  },
  {
    name: "Pratham",
    blurb:
      "One of India's largest education NGOs, focused on measurable learning outcomes for underserved children.",
    url: "https://www.pratham.org",
  },
];

export const OCCASIONS = [
  "A birthday",
  "An anniversary",
  "A festival",
  "A prayer of thanks",
  "In loving memory",
] as const;

export type Occasion = (typeof OCCASIONS)[number];

export const LEGAL = {
  usRegistration: "501(c)(3) registration pending — EIN 00-0000000",
  inRegistration: "80G & FCRA details: [registration numbers]",
  disclosure:
    "Charam publishes audited annual accounts and school-level disbursement reports. Student names and photographs appear only with written family consent.",
};
