export type DoseUnit = "mg" | "mcg";

export type ReconstitutionInputs = {
  compoundMg: number;
  diluentMl: number;
  desiredAmount: number;
  desiredUnit: DoseUnit;
};

export type ReconstitutionResult = {
  concentrationMgPerMl: number;
  desiredMg: number;
  drawVolumeMl: number;
  syringeUnits: number;
  dosesPerVial: number;
  microliters: number;
};

/** Convert mcg → mg. 1 mg = 1000 mcg. */
export function mcgToMg(mcg: number): number {
  return mcg / 1000;
}

export function desiredAmountInMg(
  amount: number,
  unit: DoseUnit,
): number {
  return unit === "mcg" ? mcgToMg(amount) : amount;
}

/**
 * Concentration-and-volume calculator.
 *
 * 1. Concentration (mg/mL) = compound (mg) ÷ diluent (mL)
 * 2. Desired amount converted to mg if entered in mcg
 * 3. Draw volume (mL) = desired (mg) ÷ concentration (mg/mL)
 * 4. U-100 syringe units = draw volume (mL) × 100
 */
export function calculateReconstitution(
  input: ReconstitutionInputs,
): ReconstitutionResult | null {
  const { compoundMg, diluentMl, desiredAmount, desiredUnit } = input;

  if (
    !Number.isFinite(compoundMg) ||
    !Number.isFinite(diluentMl) ||
    !Number.isFinite(desiredAmount) ||
    compoundMg <= 0 ||
    diluentMl <= 0 ||
    desiredAmount <= 0
  ) {
    return null;
  }

  const concentrationMgPerMl = compoundMg / diluentMl;
  const desiredMg = desiredAmountInMg(desiredAmount, desiredUnit);

  if (concentrationMgPerMl <= 0 || desiredMg <= 0) return null;

  const drawVolumeMl = desiredMg / concentrationMgPerMl;
  const syringeUnits = drawVolumeMl * 100;
  const dosesPerVial = compoundMg / desiredMg;
  const microliters = drawVolumeMl * 1000;

  return {
    concentrationMgPerMl,
    desiredMg,
    drawVolumeMl,
    syringeUnits,
    dosesPerVial,
    microliters,
  };
}

export function formatNumber(value: number, maxDigits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxDigits,
    minimumFractionDigits: 0,
  }).format(value);
}
