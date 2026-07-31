export type VendorRow = {
  vendor: string
  /** e.g. "5mg" */
  strength: string
  /** numeric mg used to derive price-per-mg */
  mg: number
  rating?: number
  reviews?: number
  price: number
  inStock: boolean
  /** e.g. "Free" or "$4.99" */
  delivery: string
  labTested: boolean
  coupon?: string
  initials: string
  iconBg: string
  verified?: boolean
  /** vendor product page — opened in a new tab from the Visit button */
  url?: string
}

export type ComparePeptide = {
  name: string
  category: string
  use: string
  vendors: VendorRow[]
}

/** Possible coupon discounts — 5% or another fixed percentage */
const COUPON_DISCOUNTS = [5, 7, 10, 12, 15]

/**
 * Discount percentage a coupon grants for a given vendor + peptide.
 * Deterministic (stable across renders) but varies per row so different
 * coupons show 5% or another percentage.
 */
export function couponDiscount(vendor: string, peptide: string): number {
  const key = `${vendor}|${peptide}`
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  return COUPON_DISCOUNTS[hash % COUPON_DISCOUNTS.length]
}

export const comparePeptides: ComparePeptide[] = [
  {
    name: 'Retatrutide',
    category: 'Weight Loss',
    use: 'Weight loss research',
    vendors: [
      { vendor: 'Dr Peptides', strength: '5mg', mg: 5, rating: 5.0, reviews: 43, price: 34.99, inStock: true, delivery: 'Free', labTested: false, initials: 'DP', iconBg: 'bg-ink', verified: true, url: 'https://ck-peptides.com/product/retatrutide-10mg-2/?utm_source=peptidesupermarket.co.uk&utm_medium=referral&utm_campaign=product_comparison&utm_content=retatrutide' },
      { vendor: 'Acepep', strength: '5mg', mg: 5, price: 34.99, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AC', iconBg: 'bg-rose-600', url: 'https://ck-peptides.com/product/retatrutide-10mg-2/?utm_source=peptidesupermarket.co.uk&utm_medium=referral&utm_campaign=product_comparison&utm_content=retatrutide' },
      { vendor: 'Precision Peptides', strength: '10mg', mg: 10, price: 37.99, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PP', iconBg: 'bg-sky-600', verified: true, url: 'https://ck-peptides.com/product/retatrutide-10mg-2/?utm_source=peptidesupermarket.co.uk&utm_medium=referral&utm_campaign=product_comparison&utm_content=retatrutide' },
      { vendor: 'Raccoon Peptides', strength: '10mg', mg: 10, rating: 4.9, reviews: 28, price: 39.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'RP', iconBg: 'bg-slate-800', url: 'https://ck-peptides.com/product/retatrutide-10mg-2/?utm_source=peptidesupermarket.co.uk&utm_medium=referral&utm_campaign=product_comparison&utm_content=retatrutide' },
      { vendor: 'Peptide Prime', strength: '10mg', mg: 10, price: 40.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PR', iconBg: 'bg-teal-600', verified: true, url: 'https://ck-peptides.com/product/retatrutide-10mg-2/?utm_source=peptidesupermarket.co.uk&utm_medium=referral&utm_campaign=product_comparison&utm_content=retatrutide' },
      { vendor: 'Pinnacle Peptides', strength: '10mg', mg: 10, rating: 4.7, reviews: 61, price: 41.5, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PK', iconBg: 'bg-indigo-600' },
      { vendor: 'Apex Research', strength: '10mg', mg: 10, rating: 4.5, reviews: 47, price: 43.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AR', iconBg: 'bg-amber-600', verified: true },
      { vendor: 'Nordic Peptides', strength: '5mg', mg: 5, rating: 4.6, reviews: 38, price: 36.5, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'NP', iconBg: 'bg-violet-600' },
      { vendor: 'Element Peptides', strength: '10mg', mg: 10, rating: 4.4, reviews: 29, price: 44.5, inStock: false, delivery: '$4.99', labTested: true, coupon: 'PEPTICENTER10', initials: 'EP', iconBg: 'bg-fuchsia-600' },
      { vendor: 'Core Peptides', strength: '10mg', mg: 10, rating: 4.3, reviews: 52, price: 46.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'CP', iconBg: 'bg-blue-600' },
    ],
  },
  {
    name: 'BPC-157',
    category: 'Healing & Recovery',
    use: 'Tissue repair & healing',
    vendors: [
      { vendor: 'Crownwell Research', strength: '10mg', mg: 10, rating: 4.9, reviews: 266, price: 71.2, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'CR', iconBg: 'bg-ink', verified: true },
      { vendor: 'Alpha Peptides', strength: '10mg', mg: 10, rating: 4.0, reviews: 164, price: 76.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AP', iconBg: 'bg-rose-600' },
      { vendor: 'Limitless Nootropics', strength: '5mg', mg: 5, rating: 4.5, reviews: 318, price: 49.5, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'LN', iconBg: 'bg-emerald-600' },
      { vendor: 'Amino Asylum', strength: '10mg', mg: 10, rating: 4.0, reviews: 186, price: 98.1, inStock: false, delivery: '$4.99', labTested: false, coupon: 'PEPTICENTER10', initials: 'AA', iconBg: 'bg-slate-800' },
      { vendor: 'PureRawz', strength: '10mg', mg: 10, rating: 4.0, reviews: 132, price: 103.5, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PR', iconBg: 'bg-ink', verified: true },
      { vendor: 'Apex Research', strength: '10mg', mg: 10, rating: 4.5, reviews: 142, price: 79.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AR', iconBg: 'bg-amber-600', verified: true },
      { vendor: 'Nordic Peptides', strength: '5mg', mg: 5, rating: 4.6, reviews: 97, price: 52.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'NP', iconBg: 'bg-violet-600' },
      { vendor: 'BioLab Supply', strength: '10mg', mg: 10, rating: 4.3, reviews: 118, price: 85.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'BL', iconBg: 'bg-cyan-600' },
      { vendor: 'Summit Peptides', strength: '10mg', mg: 10, rating: 4.4, reviews: 73, price: 91.0, inStock: false, delivery: '$4.99', labTested: true, coupon: 'PEPTICENTER10', initials: 'SP', iconBg: 'bg-lime-600' },
      { vendor: 'Core Peptides', strength: '10mg', mg: 10, rating: 4.2, reviews: 88, price: 99.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'CP', iconBg: 'bg-blue-600' },
    ],
  },
  {
    name: 'TB-500',
    category: 'Healing & Recovery',
    use: 'Muscle repair & recovery',
    vendors: [
      { vendor: 'Crownwell Research', strength: '10mg', mg: 10, rating: 4.9, reviews: 211, price: 89.1, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'CR', iconBg: 'bg-ink', verified: true },
      { vendor: 'Limitless Nootropics', strength: '10mg', mg: 10, rating: 4.5, reviews: 240, price: 94.5, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'LN', iconBg: 'bg-emerald-600' },
      { vendor: 'Alpha Peptides', strength: '5mg', mg: 5, rating: 4.0, reviews: 121, price: 59.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AP', iconBg: 'bg-rose-600' },
      { vendor: 'PureRawz', strength: '10mg', mg: 10, rating: 4.0, reviews: 98, price: 107.1, inStock: true, delivery: '$4.99', labTested: false, coupon: 'PEPTICENTER10', initials: 'PR', iconBg: 'bg-ink' },
      { vendor: 'Pinnacle Peptides', strength: '10mg', mg: 10, rating: 4.7, reviews: 154, price: 92.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PK', iconBg: 'bg-indigo-600', verified: true },
      { vendor: 'Apex Research', strength: '10mg', mg: 10, rating: 4.5, reviews: 119, price: 97.5, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AR', iconBg: 'bg-amber-600' },
      { vendor: 'Nordic Peptides', strength: '5mg', mg: 5, rating: 4.6, reviews: 84, price: 62.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'NP', iconBg: 'bg-violet-600' },
      { vendor: 'BioLab Supply', strength: '10mg', mg: 10, rating: 4.3, reviews: 91, price: 101.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'BL', iconBg: 'bg-cyan-600' },
      { vendor: 'Element Peptides', strength: '10mg', mg: 10, rating: 4.2, reviews: 57, price: 104.0, inStock: false, delivery: '$4.99', labTested: false, coupon: 'PEPTICENTER10', initials: 'EP', iconBg: 'bg-fuchsia-600' },
      { vendor: 'Core Peptides', strength: '10mg', mg: 10, rating: 4.1, reviews: 66, price: 110.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'CP', iconBg: 'bg-blue-600' },
    ],
  },
  {
    name: 'MOTS-c',
    category: 'Metabolic',
    use: 'Metabolic & cellular support',
    vendors: [
      { vendor: 'Limitless Nootropics', strength: '10mg', mg: 10, rating: 4.5, reviews: 132, price: 192.6, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'LN', iconBg: 'bg-emerald-600' },
      { vendor: 'Crownwell Research', strength: '10mg', mg: 10, rating: 4.9, reviews: 110, price: 197.1, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'CR', iconBg: 'bg-ink', verified: true },
      { vendor: 'PureRawz', strength: '5mg', mg: 5, rating: 4.0, reviews: 76, price: 119.0, inStock: false, delivery: '$4.99', labTested: false, coupon: 'PEPTICENTER10', initials: 'PR', iconBg: 'bg-ink' },
      { vendor: 'Alpha Peptides', strength: '10mg', mg: 10, rating: 4.0, reviews: 94, price: 199.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AP', iconBg: 'bg-rose-600' },
      { vendor: 'Pinnacle Peptides', strength: '10mg', mg: 10, rating: 4.7, reviews: 82, price: 201.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PK', iconBg: 'bg-indigo-600', verified: true },
      { vendor: 'Apex Research', strength: '5mg', mg: 5, rating: 4.5, reviews: 58, price: 124.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AR', iconBg: 'bg-amber-600' },
      { vendor: 'Nordic Peptides', strength: '10mg', mg: 10, rating: 4.6, reviews: 71, price: 205.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'NP', iconBg: 'bg-violet-600' },
      { vendor: 'BioLab Supply', strength: '5mg', mg: 5, rating: 4.3, reviews: 49, price: 129.0, inStock: false, delivery: '$4.99', labTested: true, coupon: 'PEPTICENTER10', initials: 'BL', iconBg: 'bg-cyan-600' },
      { vendor: 'Summit Peptides', strength: '10mg', mg: 10, rating: 4.2, reviews: 63, price: 210.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'SP', iconBg: 'bg-lime-600' },
      { vendor: 'Core Peptides', strength: '10mg', mg: 10, rating: 4.1, reviews: 55, price: 215.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'CP', iconBg: 'bg-blue-600' },
    ],
  },
  {
    name: 'GHK-Cu',
    category: 'Skin & Hair',
    use: 'Skin, hair & recovery',
    vendors: [
      { vendor: 'Crownwell Research', strength: '50mg', mg: 50, rating: 4.9, reviews: 188, price: 44.1, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'CR', iconBg: 'bg-ink', verified: true },
      { vendor: 'Alpha Peptides', strength: '50mg', mg: 50, rating: 4.0, reviews: 95, price: 46.8, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AP', iconBg: 'bg-rose-600' },
      { vendor: 'Amino Asylum', strength: '50mg', mg: 50, rating: 4.0, reviews: 80, price: 55.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'AA', iconBg: 'bg-slate-800' },
      { vendor: 'PureRawz', strength: '50mg', mg: 50, rating: 4.0, reviews: 64, price: 59.0, inStock: true, delivery: '$4.99', labTested: true, coupon: 'PEPTICENTER10', initials: 'PR', iconBg: 'bg-ink' },
      { vendor: 'Limitless Nootropics', strength: '50mg', mg: 50, rating: 4.5, reviews: 121, price: 47.5, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'LN', iconBg: 'bg-emerald-600' },
      { vendor: 'Pinnacle Peptides', strength: '50mg', mg: 50, rating: 4.7, reviews: 88, price: 49.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PK', iconBg: 'bg-indigo-600', verified: true },
      { vendor: 'Apex Research', strength: '50mg', mg: 50, rating: 4.5, reviews: 67, price: 51.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AR', iconBg: 'bg-amber-600' },
      { vendor: 'Nordic Peptides', strength: '50mg', mg: 50, rating: 4.6, reviews: 54, price: 53.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'NP', iconBg: 'bg-violet-600' },
      { vendor: 'BioLab Supply', strength: '50mg', mg: 50, rating: 4.3, reviews: 42, price: 56.0, inStock: false, delivery: '$4.99', labTested: true, coupon: 'PEPTICENTER10', initials: 'BL', iconBg: 'bg-cyan-600' },
      { vendor: 'Summit Peptides', strength: '50mg', mg: 50, rating: 4.2, reviews: 39, price: 61.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'SP', iconBg: 'bg-lime-600' },
    ],
  },
  {
    name: 'Semaglutide',
    category: 'Weight Loss',
    use: 'Weight loss & metabolic',
    vendors: [
      { vendor: 'Alpha Peptides', strength: '5mg', mg: 5, rating: 4.0, reviews: 230, price: 135.15, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AP', iconBg: 'bg-rose-600' },
      { vendor: 'Crownwell Research', strength: '5mg', mg: 5, rating: 4.9, reviews: 201, price: 152.1, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'CR', iconBg: 'bg-ink', verified: true },
      { vendor: 'Limitless Nootropics', strength: '5mg', mg: 5, rating: 4.5, reviews: 154, price: 179.0, inStock: false, delivery: '$4.99', labTested: false, coupon: 'PEPTICENTER10', initials: 'LN', iconBg: 'bg-emerald-600' },
      { vendor: 'Pinnacle Peptides', strength: '5mg', mg: 5, rating: 4.7, reviews: 176, price: 142.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PK', iconBg: 'bg-indigo-600', verified: true },
      { vendor: 'Apex Research', strength: '5mg', mg: 5, rating: 4.5, reviews: 138, price: 149.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AR', iconBg: 'bg-amber-600' },
      { vendor: 'Nordic Peptides', strength: '5mg', mg: 5, rating: 4.6, reviews: 112, price: 158.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'NP', iconBg: 'bg-violet-600' },
      { vendor: 'BioLab Supply', strength: '5mg', mg: 5, rating: 4.3, reviews: 95, price: 165.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'BL', iconBg: 'bg-cyan-600' },
      { vendor: 'Element Peptides', strength: '5mg', mg: 5, rating: 4.2, reviews: 71, price: 171.0, inStock: false, delivery: '$4.99', labTested: false, coupon: 'PEPTICENTER10', initials: 'EP', iconBg: 'bg-fuchsia-600' },
      { vendor: 'Core Peptides', strength: '5mg', mg: 5, rating: 4.1, reviews: 83, price: 185.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'CP', iconBg: 'bg-blue-600' },
      { vendor: 'Summit Peptides', strength: '5mg', mg: 5, rating: 4.2, reviews: 60, price: 168.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'SP', iconBg: 'bg-lime-600' },
    ],
  },
  {
    name: 'Wolverine Blend',
    category: 'Blends',
    use: 'BPC-157 + TB-500 healing stack',
    vendors: [
      { vendor: 'Crownwell Research', strength: '10mg', mg: 10, rating: 4.9, reviews: 142, price: 119.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'CR', iconBg: 'bg-ink', verified: true },
      { vendor: 'Alpha Peptides', strength: '10mg', mg: 10, rating: 4.0, reviews: 96, price: 124.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AP', iconBg: 'bg-rose-600' },
      { vendor: 'Raccoon Peptides', strength: '10mg', mg: 10, rating: 4.9, reviews: 51, price: 129.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'RP', iconBg: 'bg-slate-800' },
      { vendor: 'PureRawz', strength: '10mg', mg: 10, rating: 4.0, reviews: 73, price: 138.0, inStock: false, delivery: '$4.99', labTested: false, coupon: 'PEPTICENTER10', initials: 'PR', iconBg: 'bg-ink' },
      { vendor: 'Limitless Nootropics', strength: '10mg', mg: 10, rating: 4.5, reviews: 88, price: 122.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'LN', iconBg: 'bg-emerald-600' },
      { vendor: 'Pinnacle Peptides', strength: '10mg', mg: 10, rating: 4.7, reviews: 79, price: 126.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PK', iconBg: 'bg-indigo-600', verified: true },
      { vendor: 'Apex Research', strength: '10mg', mg: 10, rating: 4.5, reviews: 64, price: 131.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AR', iconBg: 'bg-amber-600' },
      { vendor: 'Nordic Peptides', strength: '10mg', mg: 10, rating: 4.6, reviews: 57, price: 134.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'NP', iconBg: 'bg-violet-600' },
      { vendor: 'BioLab Supply', strength: '10mg', mg: 10, rating: 4.3, reviews: 48, price: 142.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'BL', iconBg: 'bg-cyan-600' },
      { vendor: 'Core Peptides', strength: '10mg', mg: 10, rating: 4.1, reviews: 41, price: 148.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'CP', iconBg: 'bg-blue-600' },
    ],
  },
  {
    name: 'GLOW Blend',
    category: 'Blends',
    use: 'GHK-Cu + BPC-157 + TB-500 skin stack',
    vendors: [
      { vendor: 'Crownwell Research', strength: '15mg', mg: 15, rating: 4.9, reviews: 121, price: 134.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'CR', iconBg: 'bg-ink', verified: true },
      { vendor: 'Limitless Nootropics', strength: '15mg', mg: 15, rating: 4.5, reviews: 88, price: 139.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'LN', iconBg: 'bg-emerald-600' },
      { vendor: 'Alpha Peptides', strength: '15mg', mg: 15, rating: 4.0, reviews: 64, price: 145.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AP', iconBg: 'bg-rose-600' },
      { vendor: 'Raccoon Peptides', strength: '15mg', mg: 15, rating: 4.9, reviews: 47, price: 137.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'RP', iconBg: 'bg-slate-800' },
      { vendor: 'PureRawz', strength: '15mg', mg: 15, rating: 4.0, reviews: 58, price: 141.0, inStock: true, delivery: '$4.99', labTested: false, coupon: 'PEPTICENTER10', initials: 'PR', iconBg: 'bg-ink' },
      { vendor: 'Pinnacle Peptides', strength: '15mg', mg: 15, rating: 4.7, reviews: 72, price: 143.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PK', iconBg: 'bg-indigo-600', verified: true },
      { vendor: 'Apex Research', strength: '15mg', mg: 15, rating: 4.5, reviews: 55, price: 148.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AR', iconBg: 'bg-amber-600' },
      { vendor: 'Nordic Peptides', strength: '15mg', mg: 15, rating: 4.6, reviews: 43, price: 151.0, inStock: false, delivery: '$4.99', labTested: true, coupon: 'PEPTICENTER10', initials: 'NP', iconBg: 'bg-violet-600' },
      { vendor: 'Core Peptides', strength: '15mg', mg: 15, rating: 4.1, reviews: 36, price: 159.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'CP', iconBg: 'bg-blue-600' },
      { vendor: 'Summit Peptides', strength: '15mg', mg: 15, rating: 4.2, reviews: 31, price: 153.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'SP', iconBg: 'bg-lime-600' },
    ],
  },
  {
    name: 'CJC-1295',
    category: 'Growth Hormone',
    use: 'GH release & recovery',
    vendors: [
      { vendor: 'Crownwell Research', strength: '5mg', mg: 5, rating: 4.9, reviews: 134, price: 54.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'CR', iconBg: 'bg-ink', verified: true },
      { vendor: 'Limitless Nootropics', strength: '5mg', mg: 5, rating: 4.5, reviews: 102, price: 57.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'LN', iconBg: 'bg-emerald-600' },
      { vendor: 'Alpha Peptides', strength: '5mg', mg: 5, rating: 4.0, reviews: 71, price: 62.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AP', iconBg: 'bg-rose-600' },
      { vendor: 'PureRawz', strength: '5mg', mg: 5, rating: 4.0, reviews: 58, price: 56.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PR', iconBg: 'bg-ink' },
      { vendor: 'Amino Asylum', strength: '5mg', mg: 5, rating: 4.0, reviews: 49, price: 59.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'AA', iconBg: 'bg-slate-800' },
      { vendor: 'Pinnacle Peptides', strength: '5mg', mg: 5, rating: 4.7, reviews: 64, price: 60.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PK', iconBg: 'bg-indigo-600', verified: true },
      { vendor: 'Apex Research', strength: '5mg', mg: 5, rating: 4.5, reviews: 52, price: 63.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AR', iconBg: 'bg-amber-600' },
      { vendor: 'Nordic Peptides', strength: '5mg', mg: 5, rating: 4.6, reviews: 41, price: 65.0, inStock: false, delivery: '$4.99', labTested: true, coupon: 'PEPTICENTER10', initials: 'NP', iconBg: 'bg-violet-600' },
      { vendor: 'Core Peptides', strength: '5mg', mg: 5, rating: 4.1, reviews: 33, price: 71.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'CP', iconBg: 'bg-blue-600' },
      { vendor: 'Summit Peptides', strength: '5mg', mg: 5, rating: 4.2, reviews: 28, price: 67.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'SP', iconBg: 'bg-lime-600' },
    ],
  },
  {
    name: 'Ipamorelin',
    category: 'Growth Hormone',
    use: 'GH peptide for recovery',
    vendors: [
      { vendor: 'Crownwell Research', strength: '5mg', mg: 5, rating: 4.9, reviews: 118, price: 49.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'CR', iconBg: 'bg-ink', verified: true },
      { vendor: 'PureRawz', strength: '5mg', mg: 5, rating: 4.0, reviews: 66, price: 53.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PR', iconBg: 'bg-ink' },
      { vendor: 'Amino Asylum', strength: '5mg', mg: 5, rating: 4.0, reviews: 54, price: 58.0, inStock: false, delivery: '$4.99', labTested: false, coupon: 'PEPTICENTER10', initials: 'AA', iconBg: 'bg-slate-800' },
      { vendor: 'Limitless Nootropics', strength: '5mg', mg: 5, rating: 4.5, reviews: 87, price: 51.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'LN', iconBg: 'bg-emerald-600' },
      { vendor: 'Alpha Peptides', strength: '5mg', mg: 5, rating: 4.0, reviews: 62, price: 55.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AP', iconBg: 'bg-rose-600' },
      { vendor: 'Pinnacle Peptides', strength: '5mg', mg: 5, rating: 4.7, reviews: 70, price: 56.5, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PK', iconBg: 'bg-indigo-600', verified: true },
      { vendor: 'Apex Research', strength: '5mg', mg: 5, rating: 4.5, reviews: 48, price: 60.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AR', iconBg: 'bg-amber-600' },
      { vendor: 'Nordic Peptides', strength: '5mg', mg: 5, rating: 4.6, reviews: 39, price: 62.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'NP', iconBg: 'bg-violet-600' },
      { vendor: 'Core Peptides', strength: '5mg', mg: 5, rating: 4.1, reviews: 31, price: 68.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'CP', iconBg: 'bg-blue-600' },
      { vendor: 'Summit Peptides', strength: '5mg', mg: 5, rating: 4.2, reviews: 26, price: 64.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'SP', iconBg: 'bg-lime-600' },
    ],
  },
  {
    name: 'Tesamorelin',
    category: 'Growth Hormone',
    use: 'Fat loss & GH research',
    vendors: [
      { vendor: 'Alpha Peptides', strength: '10mg', mg: 10, rating: 4.0, reviews: 97, price: 89.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AP', iconBg: 'bg-rose-600' },
      { vendor: 'Crownwell Research', strength: '10mg', mg: 10, rating: 4.9, reviews: 83, price: 94.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'CR', iconBg: 'bg-ink', verified: true },
      { vendor: 'Limitless Nootropics', strength: '10mg', mg: 10, rating: 4.5, reviews: 60, price: 99.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'LN', iconBg: 'bg-emerald-600' },
      { vendor: 'PureRawz', strength: '10mg', mg: 10, rating: 4.0, reviews: 52, price: 92.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PR', iconBg: 'bg-ink' },
      { vendor: 'Amino Asylum', strength: '10mg', mg: 10, rating: 4.0, reviews: 44, price: 97.0, inStock: false, delivery: '$4.99', labTested: false, coupon: 'PEPTICENTER10', initials: 'AA', iconBg: 'bg-slate-800' },
      { vendor: 'Pinnacle Peptides', strength: '10mg', mg: 10, rating: 4.7, reviews: 68, price: 101.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'PK', iconBg: 'bg-indigo-600', verified: true },
      { vendor: 'Apex Research', strength: '10mg', mg: 10, rating: 4.5, reviews: 51, price: 104.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'AR', iconBg: 'bg-amber-600' },
      { vendor: 'Nordic Peptides', strength: '10mg', mg: 10, rating: 4.6, reviews: 43, price: 108.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'NP', iconBg: 'bg-violet-600' },
      { vendor: 'Core Peptides', strength: '10mg', mg: 10, rating: 4.1, reviews: 35, price: 116.0, inStock: true, delivery: 'Free', labTested: false, coupon: 'PEPTICENTER10', initials: 'CP', iconBg: 'bg-blue-600' },
      { vendor: 'Summit Peptides', strength: '10mg', mg: 10, rating: 4.2, reviews: 30, price: 112.0, inStock: true, delivery: 'Free', labTested: true, coupon: 'PEPTICENTER10', initials: 'SP', iconBg: 'bg-lime-600' },
    ],
  },
]

export const compareCategories = [
  'All',
  ...Array.from(new Set(comparePeptides.map((p) => p.category))),
]

/** Medicine names used as the primary category filter on the compare page */
export const compareMedicines = ['All', ...comparePeptides.map((p) => p.name)]

export type PeptideSummary = {
  name: string
  category: string
  use: string
  /** lowest price-per-mg across vendors */
  fromPerMg: number
  /** absolute price of the cheapest-per-mg listing */
  fromPrice: number
  fromStrength: string
  bestVendor: string
  bestInitials: string
  bestBg: string
  /** % saved comparing the cheapest vs most expensive vendor (per mg) */
  savePct: number
  vendorCount: number
}

/** Per-peptide pricing summary used across the home page. */
export function peptideSummaries(): PeptideSummary[] {
  return comparePeptides.map((p) => {
    const withPerMg = p.vendors.map((v) => ({ v, perMg: v.price / v.mg }))
    const cheapest = withPerMg.reduce((a, b) => (b.perMg < a.perMg ? b : a))
    const maxPerMg = Math.max(...withPerMg.map((x) => x.perMg))
    const savePct = maxPerMg > 0 ? Math.round(((maxPerMg - cheapest.perMg) / maxPerMg) * 100) : 0
    return {
      name: p.name,
      category: p.category,
      use: p.use,
      fromPerMg: cheapest.perMg,
      fromPrice: cheapest.v.price,
      fromStrength: cheapest.v.strength,
      bestVendor: cheapest.v.vendor,
      bestInitials: cheapest.v.initials,
      bestBg: cheapest.v.iconBg,
      savePct,
      vendorCount: p.vendors.length,
    }
  })
}
