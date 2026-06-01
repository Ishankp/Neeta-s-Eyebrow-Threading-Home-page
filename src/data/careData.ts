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

export interface HealingOutcome {
  title: string;
  details: string;
  status: "perfect" | "light" | "touchup";
}

export interface WhatToExpectItem {
  time: string;
  bullets: string[];
}

export interface LongTermCareItem {
  title: string;
  details: string;
}

export interface AftercareGuide {
  id: string; // e.g., 'tinting', 'lamination'
  title: string; // e.g., 'Tinting after care'
  subtitle: string; // e.g., 'Eyebrow & Lash Tinting Post-Care'
  category: string; // e.g., 'Eyebrows & Lashes'
  description: string;
  criticalPhase: string;
  expectedResults: string;
  timeline: AftercareStep[];
  avoid: string[];
  serviceIds: string[]; // IDs of services that use this aftercare
  healingOutcomes?: HealingOutcome[];
  whatToExpect?: WhatToExpectItem[];
  longTermCare?: LongTermCareItem[];
}

export const FAQS: FAQItemData[] = [
  {
    question: "What is the difference between waxing and threading? And how do I know which one I should get?",
    answer: "Threading is an organic hair removal technique using a twisted cotton thread to precisely pluck individual hairs from the root; it causes zero skin lifting, which makes it perfect for sensitive facial zones and sharp eyebrow mapping. Waxing uses clean, warm resin wax to clear entire patches of unwanted hair quickly. We recommend threading for your facial contours, and waxing for larger body areas (or if you prefer a single quick pull).",
    serviceIds: ["tw1", "tw2", "tw3", "tw4", "tw5", "tw6", "tw7", "tw8", "tw9", "tw10", "tw11", "bw1", "bw2", "bw3", "bw4", "bw5", "bw6", "bw7", "bw8", "dp1", "dp2", "dp5", "dp7"]
  },
  {
    question: "How long does eyebrow tinting last, and how does it work?",
    answer: "Eyebrow tinting uses a safe semi-permanent vegetable dye to naturally deepen your brow color, and will lightly stain the skin underneath to fill out any sparse spots. The skin stain usually lasts up to 5-7 days, while the gorgeous depth on the brow hairs remains richly visible for 4 to 6 weeks depending on your skincare routines.",
    serviceIds: ["t1", "t2", "dp3", "dp4", "dp6", "ll3"]
  },
  {
    question: "What is a Lash Lift, and is it safe for my natural eyelashes?",
    answer: "Yes, it is completely safe! A Lash Lift is a premium treatment that curls and lifts your natural eyelashes from the core root, giving you the appearance of wearing mascara or using an eyelash curler. The results last for 6 to 8 weeks in synchronization with your natural lash growth cycle, with zero hassle.",
    serviceIds: ["ll1", "ll2"]
  },
  {
    question: "How should I prepare specifically for my first Body Waxing appointment?",
    answer: "To ensure your body waxing session is highly successful and comfortable, please verify that your hair is at least 1/4 inch long (about the size of a grain of rice). Gently exfoliate the target skin 24 to 48 hours prior to your visit. Avoid wearing heavy body oils or creams on the day of your appointment, and wear loose, comfortable clothing.",
    serviceIds: ["bw1", "bw2", "bw3", "bw4", "bw5", "bw6", "bw7", "bw8", "dp5"]
  }
];

export const AFTERCARE_GUIDES: AftercareGuide[] = [
  {
    id: "tinting",
    title: "Tinting after care",
    subtitle: "Eyebrow & Lash Tinting Post-Care",
    category: "Color Definition",
    description: "Lock in and protect the richness and depth of your semi-permanent lash or brow vegetable tint.",
    criticalPhase: "First 24 hours of pigment absorption",
    expectedResults: "Full, rich color and dark lash depth for up to 4-6 weeks",
    serviceIds: ["t1", "t2", "dp3", "dp4", "dp6", "ll3"],
    timeline: [
      {
        time: "First 24 Hours",
        title: "Avoid Water & Moisture",
        details: "No water, swimming, steam, or heavy sweat. Moisture in the first 24 hours can strip the newly bonded pigment."
      },
      {
        time: "First 24 Hours",
        title: "Skip Makeup",
        details: "Avoid applying heavy concealer, brow pencils, or eye creams around the area to let the tint dry thoroughly."
      },
      {
        time: "First 48 Hours",
        title: "Avoid Direct Heat & Rubbing",
        details: "For the first 48 hours, avoid face-steaming, hot tubs, or aggressive scrubbing of the tinted area to prevent premature fading."
      },
      {
        time: "Days 2 - 14",
        title: "Oil-Free Cleansing Only",
        details: "Cleanse your face with oil-free products. Avoid oil-based makeup removers, as oil speeds up tint fading."
      },
      {
        time: "Ongoing Care",
        title: "UV & Sun Protection",
        details: "Avoid direct, prolonged sunbeds or intense sunlight exposure as UV rays can naturally bleach the brow outline and hair pigments."
      }
    ],
    avoid: [
      "Oil-based face creams, facial cleansers, or eye makeup removers.",
      "Rough scrubbing, rubbing, or physical exfoliation of the brow/lash area.",
      "Direct face steam, saunas, and swimming pools during the initial 24 hours.",
      "Applying active retinoids, glycolic acids, or AHAs directly over your brows."
    ]
  },
  {
    id: "lamination",
    title: "Eyelash lift and brow lamination care",
    subtitle: "Eyebrow Lamination & Lash Lift Post-Care",
    category: "Brow & Lash Curation",
    description: "Refine and maintain that beautifully feathered brow alignment and upward natural lash curve.",
    criticalPhase: "First 24 to 48 hours is essential for setting",
    expectedResults: "Perfected, lifted brows and curved lashes for up to 6-8 weeks",
    serviceIds: ["ll1", "ll2", "ll3"],
    timeline: [
      {
        time: "First 24 Hours",
        title: "Total Dry Environment",
        details: "No wet face, no steam rooms, saunas, hot showers, or intense workouts. The hairs must dry in their set position."
      },
      {
        time: "First 24 Hours",
        title: "Hands Off & Back Sleep",
        details: "Do not touch the hairs or play with them. Sleep exclusively on your back to prevent denting the fresh shape."
      },
      {
        time: "First 48 Hours",
        title: "Zero Direct Rubbing & Products",
        details: "Avoid intense eye styling serums, custom styling mascaras, and friction during the initial setting window to secure your lift's hold."
      },
      {
        time: "Day 2 onwards",
        title: "Brush and Style Daily",
        details: "Comb brows upward and lashes outward gently with a clean spoolie brush every morning to preserve the uniform direction."
      },
      {
        time: "Day 3 onwards",
        title: "Restore Moisture Nightly",
        details: "Apply castor oil, argan oil, or a specialized lash/brow serum nightly to keep the hairs soft, glossy, and hydrated."
      }
    ],
    avoid: [
      "Getting eyes or brows wet inside the first 24-hour setting phase.",
      "Applying eye makeup, foundations, or mascara for the first 24 hours.",
      "Sleeping face-down on your pillow, which can distort hair patterns.",
      "Using waterproof mascara—the harsh removal process can break curls."
    ]
  },
  {
    id: "waxing",
    title: "Post-Waxing Care",
    subtitle: "Your Guide to Smooth & Healthy Skin",
    category: "Skin Care & Soothing",
    description: "We are thrilled you chose us for your waxing service today! We understand that having your skin waxed can feel like a big step, but rest assured, our professional techniques are designed with your safety and comfort as our top priority. Because your skin has just undergone a thorough exfoliation and hair removal process, it is currently in a delicate state. Following a consistent aftercare routine is the secret to preventing irritation, avoiding ingrown hairs, and ensuring your skin stays silky smooth for as long as possible.",
    criticalPhase: "First 24–48 hours of delicate care",
    expectedResults: "Silky smooth, irritation-free, healthy & glowing skin",
    serviceIds: ["tw1", "tw2", "tw3", "tw4", "tw5", "tw6", "tw7", "tw8", "tw9", "tw10", "tw11", "bw1", "bw2", "bw3", "bw4", "bw5", "bw6", "bw7", "bw8", "dp1", "dp2", "dp5", "dp7"],
    timeline: [
      {
        time: "First 24–48 Hours",
        title: "Keep it Clean and Cool",
        details: "Avoid hot baths, saunas, steam rooms, or vigorous exercise for the first 24–48 hours. Excessive heat and sweat can irritate open follicles; use lukewarm water when showering."
      },
      {
        time: "First 48 Hours",
        title: "Hands Off",
        details: "Please avoid touching or scratching the waxed area. Your hands carry bacteria that can easily cause breakouts in the freshly exposed follicles."
      },
      {
        time: "First 48 Hours",
        title: "Choose Breathable Fabrics",
        details: "Wear loose-fitting, natural fiber clothing (like cotton) to prevent friction and allow your skin to breathe."
      },
      {
        time: "First 24 Hours",
        title: "Skip Heavy Products",
        details: "Do not apply heavily scented lotions, perfumes, or harsh chemicals (like those containing alcohol or strong acids) to the area for at least 24 hours."
      },
      {
        time: "Ongoing Care",
        title: "Sun Protection",
        details: "Your skin is more sensitive to UV rays after waxing. Keep the area covered or use a gentle, fragrance-free SPF if exposure is unavoidable."
      },
      {
        time: "After 48–72 Hours",
        title: "The Exfoliation Rule",
        details: "Wait at least 48–72 hours before you begin exfoliating. Once that window has passed, gently exfoliate the area 2–3 times a week to prevent dead skin cells from trapping hairs and causing ingrowns."
      },
      {
        time: "Daily Care",
        title: "Hydrate",
        details: "Use a mild, calming moisturizer (like pure Aloe Vera) to keep the skin hydrated and supple. Note: If you notice any redness or minor bumps, don’t panic! This is a normal reaction and should subside within 24–48 hours with proper care."
      }
    ],
    avoid: [
      "Hot baths, saunas, steam rooms, or vigorous exercise/cardio for the first 24–48 hours.",
      "Direct touching, scratching, or rubbing the freshly waxed skin area.",
      "Applying heavily scented lotions, physical/chemical perfumes, or harsh chemical skin serums.",
      "Wearing skin-hugging polyester or tight synthetic fabrics next to treated zones.",
      "Direct UV sun tanning or artificial tanning beds without fragrance-free SPF protection.",
      "Physical skin scrubbing or exfoliating scrubs before 48–72 hours have fully passed."
    ]
  },
  {
    id: "eyelash_extension",
    title: "Eyelash extension care",
    subtitle: "Classic & Strip Eyelash Post-Care",
    category: "Lashes & Extensions",
    description: "Keep your gorgeous eyelash sets full, cleanly separated, and resilient to extend their lifespan.",
    criticalPhase: "First 48 hours for medical-grade glue bonding",
    expectedResults: "Beautiful, full, and styled extensions for 3-5 weeks",
    serviceIds: ["ee1", "ee2", "ee3"],
    timeline: [
      {
        time: "First 24 Hours",
        title: "Avoid Direct Heat & Friction",
        details: "Avoid touching, pulling, brushing, or sleeping on your side. Let the extension adhesive dry cleanly in its initial setting window."
      },
      {
        time: "First 48 Hours",
        title: "Keep Them Completely Dry",
        details: "Avoid getting your lashes wet. Skip heavy steam, direct shower pressure, tears, swimming, or saunas as they weaken the glue bond before it is set."
      },
      {
        time: "Daily Care",
        title: "Brush Upward Gently",
        details: "Gently comb your lashes upward and outward daily with a clean spoolie brush to prevent tangles or twisting."
      },
      {
        time: "Ongoing Care",
        title: "Use Oil-Free Products Only",
        details: "Oil-based cleansers, eye drops, makeup removers, and face creams dissolve lash glue rapidly. Always choose oil-free alternatives."
      },
      {
        time: "Every 2-3 Weeks",
        title: "Book Infill Touch-ups",
        details: "Our natural eyelashes shed daily. Schedule touch-up infills every 2-3 weeks to replace shed lashes and keep the look perfectly dense."
      }
    ],
    avoid: [
      "Rubbing, pulling, or picking at extensions—this breaks your natural eyelash roots.",
      "Using mechanical eyelash curlers on extension fibers.",
      "Applying waterproof mascara or oil-based eye makeup.",
      "Sleeping flat on your stomach or side (friction against the pillow breaks the lash bond)."
    ]
  },
  {
    id: "microblading",
    title: "Microblading After Care",
    subtitle: "Semi-Permanent Eyebrow Post-Care",
    category: "Semi-Permanent Brows",
    description: "Congratulations on your microblading service! Following a consistent aftercare routine is the key to preventing irritation, ensuring clean pigment retention, and keeping your beautiful hyper-realistic strokes crisp for 1 to 2 years.",
    criticalPhase: "First 14 days of active healing",
    expectedResults: "Crisply healed, authentic pigment brow strokes lasting 1-2 years",
    serviceIds: [],
    timeline: [
      {
        time: "Day 1 - 14",
        title: "Gently Wash Your Brows",
        details: "Gently wash your brows with lukewarm water and mild cleanser. Avoid any harsh or scented products."
      },
      {
        time: "Day 1 - 14",
        title: "Gently Pat Dry",
        details: "After cleaning gently pat your brows dry with a clean, soft towel."
      },
      {
        time: "Day 1 - 14",
        title: "Apply Healing Cream",
        details: "Apply healing cream once your brows are dry, apply the healing cream 2-3 times a day."
      },
      {
        time: "Day 1 - 14",
        title: "Avoid Makeup",
        details: "Avoid makeup, do not apply makeup to the brow area until fully healed."
      }
    ],
    avoid: [
      "Makeup: No makeup on the healing area for the first week or until flaking has ended to avoid bacteria.",
      "Brow hair removal: No tweezing or waxing of the eyebrows for 10 full days.",
      "Facials: No facials or peels for 2 full weeks.",
      "Lasers: Avoid laser treatment in the brow area in the future.",
      "Pet grooming / Dust: No pet grooming, gardening, or anything that causes dust or dirt for a minimum of 72 hours. Waiting 7 full days for best result.",
      "Excessive sweating: Sweating is not good for the healing process. We recommend no exercising for 7 days or any activity that would induce excessive sweat or cause your face to heat up and turn red. Salt from sweat can lighten the brow.",
      "Steaming showers: Do not take steaming hot showers and keep bathroom doors open to avoid a steam effect. Keep your face from being directly hit by the shower. At the very end of your shower, wash your hair and rinse away from your face.",
      "Sun / Beach / Tanning Beds: Avoid the sun and tanning beds as much as possible for a couple of weeks. Too much sun can burn the skin and cause a darker color.",
      "Swimming: Avoid swimming for the first couple of weeks. Saltwater and chemicals in pools can affect the healing color. DO NOT expose your new procedure to chemicals, hot tubs, saunas, salt water, chlorinated pools, lakes, or ponds."
    ],
    whatToExpect: [
      {
        time: "1-2 Hours",
        bullets: [
          "Treated area will appear dramatically dark due to ink oxidizing and may appear slightly swollen.",
          "Both brows may look uneven but it is normal.",
          "It is normal to have some sensitivity after the procedure."
        ]
      },
      {
        time: "Day 1-3",
        bullets: [
          "Feeling tenderness or soreness in the treated area, similar to sunburn sensation."
        ]
      },
      {
        time: "Day 3-7",
        bullets: [
          "Natural healing: your brows will start to flake and peel. This is normal. Do not pick or scratch the area; let it flake off naturally to avoid scarring.",
          "Continue cleaning: Continue to gently clean your brows as instructed."
        ]
      },
      {
        time: "Day 7-21",
        bullets: [
          "Fading and lightening: Your brows may appear lighter or uneven. This is part of the healing process."
        ]
      },
      {
        time: "Day 42+",
        bullets: [
          "Color appears completely healed."
        ]
      }
    ],
    healingOutcomes: [
      {
        title: "Perfectly Healed",
        details: "Brows appear uniform in color and shape.",
        status: "perfect"
      },
      {
        title: "Light to Very Light",
        details: "Some areas may heal lighter than expected.",
        status: "light"
      },
      {
        title: "Didn't Take",
        details: "In rare cases, pigment may not take evenly or at all; a touch-up session can address this.",
        status: "touchup"
      }
    ],
    longTermCare: [
      {
        title: "Sun Protection",
        details: "Use sunscreen on your brows to protect the pigment from fading."
      },
      {
        title: "Avoid Harsh Treatments",
        details: "Avoid chemical peels, exfoliation and laser treatments on the brow area."
      }
    ]
  }
];

export function getFaqsForService(serviceId: string): FAQItemData[] {
  return FAQS.filter(faq => faq.serviceIds?.includes(serviceId));
}

export function getAftercareForService(serviceId: string): AftercareGuide | undefined {
  return AFTERCARE_GUIDES.find(guide => guide.serviceIds.includes(serviceId));
}

export function getAftercareById(id: string): AftercareGuide | undefined {
  return AFTERCARE_GUIDES.find(guide => guide.id === id);
}
