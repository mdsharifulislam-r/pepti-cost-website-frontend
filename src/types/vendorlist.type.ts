export type PaymentMethod =
  | "Credit/Debit Card"
  | "Paypal"
  | "Stripe"
  | "Bank"
  | "Apple Pay"
  | "Google Pay";

export interface IVendorList {
  _id: string;
  name: string;
  count: number;
  about: string;
  rating: number;
  total_reviews: number;
  website_url: string;
  minPrice: number;
  quality: string;
  has_discount: boolean;
  is_stock?: boolean;
  delivery_cost?: number;
  payment_methods: PaymentMethod[];
  discount_amount: number;
  is_verified: boolean;
  coupon_code?: string;
}
