import { comparePeptides, couponDiscount } from './compare'

export type Vendor = {
  name: string
  initials: string
  iconBg: string
  verified: boolean
  blurb: string
  website?: string
  /** average rating across listed products (0 if none rated) */
  rating: number
  reviews: number
  /** number of peptides this vendor lists */
  products: number
  labTested: boolean
  coupon?: string
  /** best coupon discount percentage this vendor offers */
  discount: number
  /** lowest price-per-mg this vendor offers */
  fromPerMg: number
}

/** Editorial details that aren't part of the price data */
const vendorMeta: Record<string, { blurb: string; website?: string }> = {
  'Dr Peptides': {
    blurb: 'Top-rated UK supplier known for fast, free shipping and consistent quality.',
    website: 'https://ck-peptides.com',
  },
  Acepep: {
    blurb: 'Budget-friendly vendor with lab-tested research peptides and quick dispatch.',
  },
  'Precision Peptides': {
    blurb: 'Verified supplier focused on high-purity peptides and detailed COAs.',
  },
  'Raccoon Peptides': {
    blurb: 'Community-favourite vendor with strong reviews and reliable stock.',
  },
  'Peptide Prime': {
    blurb: 'Premium research peptides with full third-party lab testing.',
  },
  'Crownwell Research': {
    blurb: 'Flagship verified vendor offering the widest catalogue and best value.',
  },
  'Alpha Peptides': {
    blurb: 'Long-standing supplier with aggressive coupon discounts.',
  },
  'Limitless Nootropics': {
    blurb: 'Trusted nootropics and peptide retailer with thousands of reviews.',
  },
  'Amino Asylum': {
    blurb: 'High-volume vendor with a broad range of research compounds.',
  },
  PureRawz: {
    blurb: 'Established brand offering lab-tested peptides and blends.',
  },
}

function buildVendors(): Vendor[] {
  const map = new Map<
    string,
    {
      initials: string
      iconBg: string
      verified: boolean
      ratingSum: number
      ratingCount: number
      reviews: number
      products: number
      labTested: boolean
      coupon?: string
      discount: number
      minPerMg: number
    }
  >()

  for (const peptide of comparePeptides) {
    for (const v of peptide.vendors) {
      const perMg = v.price / v.mg
      const discount = v.coupon ? couponDiscount(v.vendor, peptide.name) : 0
      const existing = map.get(v.vendor)
      if (existing) {
        existing.products += 1
        existing.reviews += v.reviews ?? 0
        existing.verified = existing.verified || Boolean(v.verified)
        existing.labTested = existing.labTested || v.labTested
        existing.coupon = existing.coupon ?? v.coupon
        existing.discount = Math.max(existing.discount, discount)
        existing.minPerMg = Math.min(existing.minPerMg, perMg)
        if (v.rating != null) {
          existing.ratingSum += v.rating
          existing.ratingCount += 1
        }
      } else {
        map.set(v.vendor, {
          initials: v.initials,
          iconBg: v.iconBg,
          verified: Boolean(v.verified),
          ratingSum: v.rating ?? 0,
          ratingCount: v.rating != null ? 1 : 0,
          reviews: v.reviews ?? 0,
          products: 1,
          labTested: v.labTested,
          coupon: v.coupon,
          discount,
          minPerMg: perMg,
        })
      }
    }
  }

  return Array.from(map.entries())
    .map(([name, d]) => ({
      name,
      initials: d.initials,
      iconBg: d.iconBg,
      verified: d.verified,
      blurb: vendorMeta[name]?.blurb ?? 'Trusted research peptide supplier.',
      website: vendorMeta[name]?.website,
      rating: d.ratingCount ? d.ratingSum / d.ratingCount : 0,
      reviews: d.reviews,
      products: d.products,
      labTested: d.labTested,
      coupon: d.coupon,
      discount: d.discount,
      fromPerMg: d.minPerMg,
    }))
    .sort((a, b) => b.rating - a.rating || a.fromPerMg - b.fromPerMg)
}

export const vendors: Vendor[] = buildVendors()
