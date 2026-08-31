import { useMemo, useState, type ReactNode } from "react";
import {
  Beaker,
  Calculator,
  ChevronDown,
  Droplets,
  FlaskConical,
  Info,
  Syringe,
} from "lucide-react";
import {
  calculateReconstitution,
  formatNumber,
  type DoseUnit,
} from "../helpers/reconstitution";

const VIAL_PRESETS = [5, 10, 15, 30, 50];
const DILUENT_PRESETS = [1, 2, 3, 5];
const DOSE_PRESETS_MG = [0.1, 0.25, 0.5, 1, 2, 5];
const DOSE_PRESETS_MCG = [100, 250, 500, 1000, 2000, 5000];

const faqs = [
  {
    question: "How does this concentration-and-volume calculator work?",
    answer:
      "It uses three inputs: the amount of compound in the vial (mg), the volume of diluent added (mL), and the desired amount per draw (mg or mcg). Concentration is compound ÷ diluent. Draw volume is desired amount ÷ concentration. On a U-100 syringe, 1 mL = 100 units, so syringe units = draw volume × 100.",
  },
  {
    question: "What is concentration?",
    answer:
      "Concentration is how much compound is in each milliliter of liquid after mixing. Example: 10 mg of compound in 2 mL of diluent is 5 mg/mL, so every 1 mL contains 5 mg.",
  },
  {
    question: "Why convert mcg to mg?",
    answer:
      "The formulas need the desired amount in the same unit as the vial (mg). If you enter mcg, the calculator divides by 1,000 first (250 mcg = 0.25 mg), then calculates volume.",
  },
  {
    question: "What are U-100 syringe units?",
    answer:
      "A standard U-100 syringe is marked so that 100 units equal 1 mL. After the calculator finds the draw volume in mL, it multiplies by 100 to show units. Example: 0.05 mL × 100 = 5 units.",
  },
];

function PresetRow({
  options,
  value,
  suffix,
  onSelect,
}: {
  options: number[];
  value: number;
  suffix: string;
  onSelect: (n: number) => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
              active
                ? "bg-brand-600 text-white shadow-sm shadow-brand-600/25"
                : "border border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700"
            }`}
          >
            {option}
            {suffix}
          </button>
        );
      })}
    </div>
  );
}

function InputCard({
  step,
  icon,
  title,
  subtitle,
  extra,
  value,
  unit,
  onChange,
  children,
}: {
  step: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  extra?: ReactNode;
  value: number | "";
  unit: string;
  onChange: (value: number | "") => void;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.05)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600">
            {icon}
          </span>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
              Step {step}
            </div>
            <h2 className="mt-0.5 text-[16px] font-bold text-ink">{title}</h2>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
              {subtitle}
            </p>
          </div>
        </div>
        {extra}
      </div>

      <div className="relative mt-5">
        <input
          type="number"
          min={0}
          step="any"
          value={value}
          onChange={(e) => {
            const next = e.target.value;
            onChange(next === "" ? "" : Number(next));
          }}
          className="no-spinner w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-5 pl-4 pr-16 text-center text-[32px] font-extrabold tracking-tight text-ink outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white px-2.5 py-1 text-[13px] font-bold text-slate-500 shadow-sm">
          {unit}
        </span>
      </div>
      {children}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-ink">{question}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      {open && (
        <p className="border-t border-slate-100 px-6 py-4 text-[14.5px] leading-relaxed text-slate-600">
          {answer}
        </p>
      )}
    </div>
  );
}

function SyringeGauge({ units }: { units: number }) {
  const fill = Math.min(100, Math.max(0, units));

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between text-[12px] font-semibold text-white/80">
        <span>U-100 syringe draw</span>
        <span>{formatNumber(units, 1)} / 100</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 shrink-0 rounded-full border-2 border-white/40 bg-white/20" />
        <div className="relative h-7 flex-1 overflow-hidden rounded-full bg-white/15 ring-1 ring-white/20">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.35)] transition-all duration-500"
            style={{ width: `${fill}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-between px-3 text-[10px] font-bold text-white/50">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        <div className="h-3 w-8 rounded-r-full bg-white/25" />
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  const [compoundMg, setCompoundMg] = useState<number | "">(5);
  const [diluentMl, setDiluentMl] = useState<number | "">(1);
  const [desiredAmount, setDesiredAmount] = useState<number | "">(2);
  const [desiredUnit, setDesiredUnit] = useState<DoseUnit>("mg");

  const result = useMemo(
    () =>
      calculateReconstitution({
        compoundMg: Number(compoundMg),
        diluentMl: Number(diluentMl),
        desiredAmount: Number(desiredAmount),
        desiredUnit,
      }),
    [compoundMg, diluentMl, desiredAmount, desiredUnit],
  );

  const handleUnitChange = (unit: DoseUnit) => {
    if (unit === desiredUnit) return;
    const current = Number(desiredAmount);
    if (Number.isFinite(current) && current > 0) {
      setDesiredAmount(
        unit === "mcg"
          ? Number((current * 1000).toFixed(4))
          : Number((current / 1000).toFixed(4)),
      );
    }
    setDesiredUnit(unit);
  };

  return (
    <div className="bg-[#f7fafd]">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f0fd] to-[#f7fafd]">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3.5 py-1.5 text-[13px] font-semibold text-brand-700 shadow-sm backdrop-blur">
            <Calculator className="h-4 w-4 text-brand-600" />
            Concentration & volume
          </div>
          <h1 className="mt-5 text-[28px] font-extrabold leading-tight tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
            Reconstitution{" "}
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-slate-600">
            Enter vial amount, diluent, and desired amount — get concentration,
            draw volume, and U-100 syringe units instantly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <div className="grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-4">
            <InputCard
              step="01"
              icon={<FlaskConical className="h-5 w-5" />}
              title="Vial amount"
              subtitle="Total compound printed on the label."
              value={compoundMg}
              unit="mg"
              onChange={setCompoundMg}
            >
              <PresetRow
                options={VIAL_PRESETS}
                value={Number(compoundMg)}
                suffix="mg"
                onSelect={setCompoundMg}
              />
            </InputCard>

            <InputCard
              step="02"
              icon={<Droplets className="h-5 w-5" />}
              title="Diluent volume"
              subtitle="Liquid added when reconstituting."
              value={diluentMl}
              unit="mL"
              onChange={setDiluentMl}
            >
              <PresetRow
                options={DILUENT_PRESETS}
                value={Number(diluentMl)}
                suffix="mL"
                onSelect={setDiluentMl}
              />
            </InputCard>

            <InputCard
              step="03"
              icon={<Beaker className="h-5 w-5" />}
              title="Desired amount per draw"
              subtitle="The amount you want in each draw."
              value={desiredAmount}
              unit={desiredUnit}
              onChange={setDesiredAmount}
              extra={
                <div className="flex overflow-hidden rounded-full border border-slate-200 bg-slate-50 p-0.5">
                  {(["mg", "mcg"] as DoseUnit[]).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => handleUnitChange(unit)}
                      className={`rounded-full px-3 py-1.5 text-[12px] font-bold uppercase ${
                        desiredUnit === unit
                          ? "bg-brand-600 text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              }
            >
              <PresetRow
                options={desiredUnit === "mg" ? DOSE_PRESETS_MG : DOSE_PRESETS_MCG}
                value={Number(desiredAmount)}
                suffix={desiredUnit}
                onSelect={setDesiredAmount}
              />
            </InputCard>
          </div>

          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-6 text-white shadow-[0_20px_50px_rgba(37,99,235,0.28)] lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-extrabold">Your results</h2>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
                <Syringe className="h-5 w-5" />
              </span>
            </div>

            {result ? (
              <>
                <p className="mt-7 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70">
                  Draw syringe to
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-[56px] font-extrabold leading-none tracking-tight">
                    {formatNumber(result.syringeUnits, 1)}
                  </span>
                  <span className="mb-2 text-[18px] font-semibold text-white/80">
                    units
                  </span>
                </div>
                <p className="mt-2 text-[14px] text-white/80">
                  {formatNumber(result.microliters, 1)} µL per draw ·{" "}
                  {formatNumber(result.drawVolumeMl, 4)} mL
                </p>

                <SyringeGauge units={result.syringeUnits} />

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/12 px-4 py-4 backdrop-blur">
                    <div className="text-[12px] font-semibold text-white/70">
                      Draws per vial
                    </div>
                    <div className="mt-1 text-[26px] font-extrabold">
                      {formatNumber(result.dosesPerVial, 2)}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/12 px-4 py-4 backdrop-blur">
                    <div className="text-[12px] font-semibold text-white/70">
                      Concentration
                    </div>
                    <div className="mt-1 text-[26px] font-extrabold">
                      {formatNumber(result.concentrationMgPerMl, 2)}
                      <span className="text-[13px] font-semibold text-white/75">
                        {" "}
                        mg/mL
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-8 text-[14px] leading-relaxed text-white/80">
                Enter a vial amount, diluent volume, and desired amount greater
                than zero to see concentration and draw volume.
              </p>
            )}

            <div className="mt-8 flex items-start gap-2 rounded-2xl bg-white/10 px-4 py-3 text-[12px] leading-relaxed text-white/75">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              For research purposes only. This is a concentration-and-volume
              tool, not medical advice.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <h2 className="mb-5 text-center text-[22px] font-extrabold text-ink">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {faqs.map((item) => (
            <FaqItem key={item.question} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
