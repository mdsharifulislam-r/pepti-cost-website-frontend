import { IVendorItem } from '../types/peptides.type'

export const DOSAGE_OPTIONS = [5, 10, 15, 20] as const
export type DosageMg = (typeof DOSAGE_OPTIONS)[number]

export function sortVendorRows(
  rows: IVendorItem[],
  sortKey: 'price' | 'priceMg',
): IVendorItem[] {
  return [...rows].sort((a, b) => {
    if (sortKey === 'price') return a.total_price - b.total_price
    return a.price_per_unit - b.price_per_unit
  })
}

export function getBestValueVendorId(rows: IVendorItem[]): string | null {
  if (!rows.length) return null
  const sorted = sortVendorRows(rows, 'priceMg')
  return sorted[0]._id
}

/** Filter by dosage; simulates alternate strengths when API has no exact match. */
export function filterRowsByDosage(
  rows: IVendorItem[],
  dosage: DosageMg,
): IVendorItem[] {
  const exact = rows.filter((row) => row.unit === dosage)
  if (exact.length) return exact

  if (!rows.length) return []

  return rows.map((row) => {
    const baseUnit = row.unit || 10
    const ratio = dosage / baseUnit

    return {
      ...row,
      _id: `${row._id}-${dosage}mg`,
      unit: dosage,
      total_price: Number((row.total_price * ratio).toFixed(2)),
      discounted_price: Number((row.discounted_price * ratio).toFixed(2)),
    }
  })
}
