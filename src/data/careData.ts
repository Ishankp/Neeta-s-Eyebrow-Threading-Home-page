export interface FAQItemData {
  question: string;
  answer: string;
  serviceIds?: string[];
}

export interface AftercareStep {
  time: string;
  title: string;
  details: string;
}

export interface AftercareGuide {
  id: string; // e.g., 'tinting', 'microblading'
  title: string; // e.g., 'Tinting after care'
  subtitle: string; // e.g., 'Eyebrow & Lash Tinting Post-Care'
  category: string; // e.g., 'Eyebrows & Lashes'
  description: string;
  criticalPhase: string; // Quick stat info
  expectedResults: string; // Quick stat info
  timeline: AftercareStep[];
  avoid: string[];
  serviceIds: string[]; // IDs of services that use this aftercare
}

export const FAQS: FAQItemData[] = [
  {
    question: "What is the difference between waxing and threading? And how do i know which one I should get?",
    answer: "Coming soon",
    serviceIds: ["t1", "w1", "w2"]
  },
  {
    question: "How long does eyebrow tinting last?",
    answer: "Coming soon",
    serviceIds: ["ti1", "ti2"]
  },
  {
    question: "What should I after getting waxing to help with recovery?",
    answer: "Coming soon",
    serviceIds: ["w1", "w2"]
  }
];

export const AFTERCARE_GUIDES: AftercareGuide[] = [
  {
    id: "tinting",
    title: "Tinting after care",
    subtitle: "Eyebrow & Lash Tinting Post-Care",
    category: "Eyebrows & Lashes",
    description: "Keep your tint looking bold, rich, and beautiful with these post-treatment steps.",
    criticalPhase: "First 24 hours of total dry-time",
    expectedResults: "Rich color retention for up to 4-6 weeks",
    serviceIds: ["ti1", "ti2"],
    timeline: [
      {
        time: "First 24 Hours",
        title: "Keep Them Dry",
        details: "Avoid getting your eyebrows/lashes wet. This includes steam, heavy sweating, swimming, or direct shower spray. Water can weaken the bond of the dye."
      },
      {
        time: "First 24 Hours",
        title: "Avoid Makeup & Products",
        details: "Do not apply brow makeup, heavy creams, oils, or strong cleansers directly on the treated areas in order to let the dye settle perfectly."
      },
      {
        time: "Days 2 - 14",
        title: "Gentle Cleansing Only",
        details: "Use oil-free cleansers around the brows. Avoid oil-based skincare, as oil breaks down the tint pigments much faster."
      },
      {
        time: "Ongoing Care",
        title: "Protect from Ultraviolet Rays",
        details: "Strong sunlight or sunbeds can fade the dye. Wear a hat or apply mineral sunscreen carefully around the area once healed."
      }
    ],
    avoid: [
      "Oil-based makeup removers or cleansers directly on the tint.",
      "Scrubbing, rubbing, or picking the brow area.",
      "Direct steam, saunas, and swimming pools in the first 24 hours.",
      "Applying active ingredients like Retinols or AHAs directly over your brows."
    ]
  },
  {
    id: "microblading",
    title: "Microblading aftercare",
    subtitle: "Semi-Permanent Eyebrow Microblading Post-Care",
    category: "Semi-Permanent",
    description: "Ensure flawless retention and prevent irritation with this strict healing regime.",
    criticalPhase: "First 10-14 days of careful moisture control",
    expectedResults: "Perfect symmetry & natural pigment depth for 1-2 years",
    serviceIds: ["p1"],
    timeline: [
      {
        time: "Days 1 - 3",
        title: "Absorb Excess Lymph Fluid",
        details: "Gently pat the area with a clean tissue if any lymph fluid appears. Keep the brows super clean and free of crusting. Do not let them dry out with raw lymph."
      },
      {
        time: "Days 1 - 7",
        title: "Dry Healing / Ointment Routine",
        details: "Depending on your specific skin type recommendation, keep them dry or apply a thin, half-grain-of-rice sized amount of recommended healing balm using a clean Q-tip twice a day."
      },
      {
        time: "First 10 Days",
        title: "Zero Water & Sweat",
        details: "No swimming, heavy cardiovascular workouts, saunas, or direct shower water on your face. Keep your face away from the showerhead."
      },
      {
        time: "Days 7 - 14",
        title: "The Peeling Phase",
        details: "Your brows will begin to flake or peel. DO NOT scratch, peel, or pick at them. Letting the skin shed naturally is absolutely critical for perfect pigment retention."
      }
    ],
    avoid: [
      "Picking or scratching peeling flakes—letting them peel naturally is vital.",
      "Sleeping face-down on your pillow for at least 14 days.",
      "Applying active anti-aging skin products (AHAs, Glycolics, Retinoids) or makeup on the brows.",
      "Direct chemical facials, microdermabrasion, or laser treatments for 30 days."
    ]
  }
];

// Helper functions to retrieve related content
export function getFaqsForService(serviceId: string): FAQItemData[] {
  return FAQS.filter(faq => faq.serviceIds?.includes(serviceId));
}

export function getAftercareForService(serviceId: string): AftercareGuide | undefined {
  return AFTERCARE_GUIDES.find(guide => guide.serviceIds.includes(serviceId));
}

export function getAftercareById(id: string): AftercareGuide | undefined {
  return AFTERCARE_GUIDES.find(guide => guide.id === id);
}
