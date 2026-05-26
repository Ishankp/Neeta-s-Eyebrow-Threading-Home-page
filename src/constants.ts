/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: "Threading" | "Tinting" | "Deal Prices" | "Permanent" | "Eyelash Extensions" | "Lamination" | "Facials" | "Body Wax";
}

export const ALL_SERVICES: Service[] = [
  // Threading
  {
    id: 't1',
    name: 'Eyebrow Threading',
    description: 'Precision mapping and threading for the perfect natural shape.',
    price: '$15+',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1000',
    category: 'Threading'
  },
  {
    id: 't2',
    name: 'Upper Lip',
    description: 'Gentle and precise threading for the upper lip area.',
    price: '$8+',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1000',
    category: 'Threading'
  },
  {
    id: 't3',
    name: 'Full Face',
    description: 'Complete facial threading excluding brows for a smooth finish.',
    price: '$45+',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1000',
    category: 'Threading'
  },
  // Tinting
  {
    id: 'ti1',
    name: 'Eyebrow Tint',
    description: 'Semi-permanent dye to enhance, shape, and define your brows.',
    price: '$20+',
    image: 'https://images.unsplash.com/photo-1542385310-74e2dfda9c1b?auto=format&fit=crop&q=80&w=1000',
    category: 'Tinting'
  },
  {
    id: 'ti2',
    name: 'Eyelash Tint',
    description: 'Give your lashes a darker, fuller look without mascara.',
    price: '$25+',
    image: 'https://images.unsplash.com/photo-1583001931036-643330679f2d?auto=format&fit=crop&q=80&w=1000',
    category: 'Tinting'
  },
  // Deal Prices
  {
    id: 'd1',
    name: 'Brow & Lip Combo',
    description: 'Bundle your essential threading services for a better price.',
    price: '$20',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1000',
    category: 'Deal Prices'
  },
  {
    id: 'd2',
    name: 'Full Face + Brow',
    description: 'The ultimate facial grooming package at a discounted rate.',
    price: '$55',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1000',
    category: 'Deal Prices'
  },
  // Permanent
  {
    id: 'p1',
    name: 'Microblading',
    description: 'Semi-permanent tattooing technique for fuller, natural brows.',
    price: '$350+',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1000',
    category: 'Permanent'
  },
  {
    id: 'p2',
    name: 'Ombre Powder Brows',
    description: 'Gradual shading technique for a soft, powdered makeup look.',
    price: '$400+',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1000',
    category: 'Permanent'
  },
  // Eyelash Extensions
  {
    id: 'e1',
    name: 'Classic Full Set',
    description: 'Individual extensions applied to each natural lash for length.',
    price: '$120+',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=1000',
    category: 'Eyelash Extensions'
  },
  {
    id: 'e2',
    name: 'Volume Full Set',
    description: 'Multiple lightweight extensions per lash for a dramatic, full look.',
    price: '$160+',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1000',
    category: 'Eyelash Extensions'
  },
  // Lamination
  {
    id: 'l1',
    name: 'Brow Lamination',
    description: 'Redirect and set brow hairs for a fuller, lifted, uniform look.',
    price: '$75+',
    image: 'https://images.unsplash.com/photo-1542385310-74e2dfda9c1b?auto=format&fit=crop&q=80&w=1000',
    category: 'Lamination'
  },
  // Facials
  {
    id: 'f1',
    name: 'Signature Glow Facial',
    description: 'Our most popular facial for deep hydration and radiance.',
    price: '$65+',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000',
    category: 'Facials'
  },
  {
    id: 'f2',
    name: 'Acne Defense Treatment',
    description: 'Targeted facial to clear pores and reduce inflammation.',
    price: '$80+',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=1000',
    category: 'Facials'
  },
  // Body Wax
  {
    id: 'w1',
    name: 'Full Arm Wax',
    description: 'Smooth skin from shoulder to wrist with premium wax.',
    price: '$40+',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1000',
    category: 'Body Wax'
  },
  {
    id: 'w2',
    name: 'Full Leg Wax',
    description: 'Complete leg hair removal for silky smooth results.',
    price: '$60+',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1000',
    category: 'Body Wax'
  }
];
