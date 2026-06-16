/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  length?: string;
  image: string;
  category: "Threading or Waxing" | "Tinting" | "Deal Price" | "Permanent Makeup" | "Eyelash Extension" | "Facials" | "Lamination and Lift" | "Body Wax";
}

export type Category = 
  | "Threading or Waxing"
  | "Tinting"
  | "Deal Price"
  | "Permanent Makeup"
  | "Eyelash Extension"
  | "Facials"
  | "Lamination and Lift"
  | "Body Wax";

export const CATEGORIES: Category[] = [
  "Threading or Waxing",
  "Tinting",
  "Deal Price",
  "Permanent Makeup",
  "Eyelash Extension",
  "Facials",
  "Lamination and Lift",
  "Body Wax"
];

export const ALL_SERVICES: Service[] = [
  // Threading or Waxing
  {
    id: 'tw1',
    name: 'Eyebrow',
    description: 'Precision mapping and hair removal (threading or waxing) for the perfect natural shape.',
    price: '$17',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
    category: 'Threading or Waxing'
  },
  {
    id: 'tw2',
    name: 'Upper Lip',
    description: 'Gentle and precise removal for smooth, clean upper lip area.',
    price: '$10',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600',
    category: 'Threading or Waxing'
  },
  {
    id: 'tw3',
    name: 'Lower Lip',
    description: 'Quick and gentle removal on the lower lip area.',
    price: '$4',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600',
    category: 'Threading or Waxing'
  },
  {
    id: 'tw4',
    name: 'Unibrow',
    description: 'Precise grooming of the brow center to define individual brows perfectly.',
    price: '$8',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
    category: 'Threading or Waxing'
  },
  {
    id: 'tw5',
    name: 'Chin',
    description: 'Smooth and thorough hair removal for a flawless, clean chin.',
    price: '$10',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Threading or Waxing'
  },
  {
    id: 'tw6',
    name: 'Neck',
    description: 'Effective hair removal for the neck area to complement facial treatments.',
    price: '$12',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Threading or Waxing'
  },
  {
    id: 'tw7',
    name: 'Side Burn',
    description: 'Neat scaling and clean definition of your sideburns for a balanced framing.',
    price: '$15',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Threading or Waxing'
  },
  {
    id: 'tw8',
    name: 'Cheeks',
    description: 'Gentle facial hair grooming to leave cheeks baby smooth and clear.',
    price: '$10',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Threading or Waxing'
  },
  {
    id: 'tw9',
    name: 'Jaw Line',
    description: 'Clean definition of the jawline for a sharper, refreshed profile.',
    price: '$10',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Threading or Waxing'
  },
  {
    id: 'tw10',
    name: 'Forehead',
    description: 'Smooth and clear forehead hair removal for a bright facial frame.',
    price: '$10',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Threading or Waxing'
  },
  {
    id: 'tw11',
    name: 'Full Face',
    description: 'Includes Forehead, Upper lip, Chin, Sideburn, and Eyebrows. Not Including Neck.',
    price: '$49',
    length: '15 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Threading or Waxing'
  },

  // Tinting
  {
    id: 't1',
    name: 'Eyebrow',
    description: 'Semi-permanent cosmetic tint to naturally darken, shape, and define your brows.',
    price: '$25',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1542385310-74e2dfda9c1b?auto=format&fit=crop&q=80&w=600',
    category: 'Tinting'
  },
  {
    id: 't2',
    name: 'Eyelash',
    description: 'Professional tint to darken and lift lashes, creating the look of wearing mascara.',
    price: '$25',
    length: '5 min',
    image: 'https://images.unsplash.com/photo-1583001931036-643330679f2d?auto=format&fit=crop&q=80&w=600',
    category: 'Tinting'
  },

  // Deal Price
  {
    id: 'dp1',
    name: 'Eyebrow and Chin Threading/Waxing',
    description: 'Perfect package to clean up eyebrows and the chin area seamlessly.',
    price: '$27',
    length: '15 min',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
    category: 'Deal Price'
  },
  {
    id: 'dp2',
    name: 'Eyebrow and Lip Threading/Waxing',
    description: 'Essential facial maintenance combo for eyebrows and upper lip.',
    price: '$25',
    length: '10 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Deal Price'
  },
  {
    id: 'dp3',
    name: 'Eyebrow and Lip Threading/Waxing + Eyebrow Tinting',
    description: 'The ultimate definition package: shape face brows/lips and tint for a rich, styled look.',
    price: '$45',
    length: '15 min',
    image: 'https://images.unsplash.com/photo-1542385310-74e2dfda9c1b?auto=format&fit=crop&q=80&w=600',
    category: 'Deal Price'
  },
  {
    id: 'dp4',
    name: 'Eyebrow Threading/Waxing + Eyebrow Tinting',
    description: 'Shape and shade combo to create stunning, beautifully defined brows.',
    price: '$38',
    length: '10 min',
    image: 'https://images.unsplash.com/photo-1542385310-74e2dfda9c1b?auto=format&fit=crop&q=80&w=600',
    category: 'Deal Price'
  },
  {
    id: 'dp5',
    name: 'Eyebrow Threading/Waxing + Under Arm Waxing',
    description: 'Combine eyebrow precision with smooth underarms under one convenient session.',
    price: '$40',
    length: '15 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Deal Price'
  },
  {
    id: 'dp6',
    name: 'Eyebrow and Eyelash Tinting',
    description: 'Double semi-permanent definition for both eyes and brows for effortless morning charm.',
    price: '$45',
    length: '10 min',
    image: 'https://images.unsplash.com/photo-1583001931036-643330679f2d?auto=format&fit=crop&q=80&w=600',
    category: 'Deal Price'
  },
  {
    id: 'dp7',
    name: 'Eyebrow, Lip, and Chin Threading/Waxing',
    description: 'Thorough facial grooming bundle covering eyebrows, upper lip, and chin.',
    price: '$35',
    length: '15 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Deal Price'
  },

  // Permanent Makeup
  {
    id: 'pm1',
    name: 'Ombre',
    description: 'A semi-permanent shading technique that creates a soft, misty, powder-filled brow look that fades lighter towards the front.',
    price: '$299',
    length: '180 min',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
    category: 'Permanent Makeup'
  },
  {
    id: 'pm2',
    name: 'Powder',
    description: 'A soft, powdered makeup look with a solid, defined shape—perfect for those who prefer a fuller, more filled-in appearance.',
    price: '$299',
    length: '180 min',
    image: 'https://images.unsplash.com/photo-1542385310-74e2dfda9c1b?auto=format&fit=crop&q=80&w=600',
    category: 'Permanent Makeup'
  },

  // Eyelash Extension
  {
    id: 'ee1',
    name: 'Eyelashes Touch Up',
    description: 'Quick checkup and infill to maintain full, gorgeous, and robust eyelashes.',
    price: '$15',
    length: '10 min',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600',
    category: 'Eyelash Extension'
  },
  {
    id: 'ee2',
    name: 'Eyelash Strips',
    description: 'Temporary strip lashes application for instant style, definition, and eye flare.',
    price: '$25',
    length: '10 min',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600',
    category: 'Eyelash Extension'
  },
  {
    id: 'ee3',
    name: 'Eyelash Extensions',
    description: 'Classic set lash extensions to transform your look. Please note: these are NOT Individual lashes.',
    price: '$40',
    length: '15 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Eyelash Extension'
  },

  // Facials
  {
    id: 'f1',
    name: 'Mini Facials',
    description: 'Face wash, gentle exfoliating scrub, soothing moisturizer, and a nourishing face mask.',
    price: '$49',
    length: '30 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
    category: 'Facials'
  },
  {
    id: 'f2',
    name: 'Deluxe Facials',
    description: 'Complete skin therapy: face wash, direct steam, facial scrub, thorough exfoliation, face massage, and a clarifying face mask.',
    price: '$70',
    length: '60 min',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=600',
    category: 'Facials'
  },

  // Lamination and Lift
  {
    id: 'll1',
    name: 'Eyelash Lift',
    description: 'Perming of natural eyelashes from root to tip to give them an elegant, long-lasting upward curl.',
    price: '$85',
    length: '60 min',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=600',
    category: 'Lamination and Lift'
  },
  {
    id: 'll2',
    name: 'Eyelash List and Eyebrow Lamination',
    description: 'The ultimate ocular framing combo: beautifully curved lashes and uniform, lifted model eyebrows.',
    price: '$160',
    length: '75 min',
    image: 'https://images.unsplash.com/photo-1542385310-74e2dfda9c1b?auto=format&fit=crop&q=80&w=600',
    category: 'Lamination and Lift'
  },
  {
    id: 'll3',
    name: 'Eyebrow Lamination',
    description: 'Redirects and sets brow hairs for a fuller, brushed-up feathered look. Includes complementary Eyebrow Tinting.',
    price: '$95',
    length: '45 min',
    image: 'https://images.unsplash.com/photo-1542385310-74e2dfda9c1b?auto=format&fit=crop&q=80&w=600',
    category: 'Lamination and Lift'
  },

  // Body Wax
  {
    id: 'bw3',
    name: 'Brazilian Wax',
    description: 'Full intimate region hair removal with extra care and maximum hygiene styling.',
    price: '$60',
    length: '20 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Body Wax'
  },
  {
    id: 'bw1',
    name: 'Bikini Wax',
    description: 'Fast, professional, and hygienic bikini zone hair removal using premium products.',
    price: '$30',
    length: '15 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Body Wax'
  },
  {
    id: 'bw4',
    name: 'Back Wax',
    description: 'Clean and smooth full back hair removal for pure comfort.',
    price: '$50',
    length: '20 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Body Wax'
  },
  {
    id: 'bw2',
    name: 'Full Arm Wax',
    description: 'Complete arm hair removal from shoulder to wrist for silky, touchable skin.',
    price: '$50',
    length: '20 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Body Wax'
  },
  {
    id: 'bw5',
    name: 'Half Arm Wax',
    description: 'Thorough hair removal past the elbow to the hand only (does not include the bicep area).',
    price: '$30',
    length: '15 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Body Wax'
  },
  {
    id: 'bw7',
    name: 'Full Leg Wax',
    description: 'Complete leg hair removal to produce silky, radiating skin from thighs to ankles.',
    price: '$70',
    length: '25 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Body Wax'
  },
  {
    id: 'bw6',
    name: 'Half Leg Wax',
    description: 'Hair removal targeting the calf or the lower leg area only.',
    price: '$45',
    length: '15 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Body Wax'
  },
  {
    id: 'bw8',
    name: 'Under Arm Wax',
    description: 'Quick and hygienic treatment to keep underarms hair-free and soft.',
    price: '$25',
    length: '10 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    category: 'Body Wax'
  }
];
