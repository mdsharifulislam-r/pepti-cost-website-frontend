import { PaymentMethod } from "./vendorlist.type";

export interface IPeptideList {
    _id: string
    name: string
}

export interface IVendorItem {
    _id: string
    name: string
    is_verified: boolean
    rating: number
    total_reviews: number
    about: string
    quality: string
    has_discount: boolean
    discount_amount: number
    website_url: string
    peptide_amount: number
    status: string
    coupon_code: string
    price_per_unit: number
    total_price: number
    unit: number
    discounted_price: number
    peptide: string
    peptide_str: string
    is_stock?: boolean
    delivery_cost?: number
    payment_methods?: PaymentMethod[]
    createdAt: string
    updatedAt: string
}

export interface IPeptideItem {
    name: string
    count: number
    minPrice: number
    maxDiscount: number
}