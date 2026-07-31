import type { ComponentType } from "react";
import { CreditCard, Landmark } from "lucide-react";
import { PaymentMethod } from "../types/vendorlist.type";

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  "Credit/Debit Card": "Credit/Debit Card",
  Paypal: "PayPal",
  Stripe: "Stripe",
  Bank: "Bank transfer",
  "Apple Pay": "Apple Pay",
  "Google Pay": "Google Pay",
};

function PaypalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.901A.641.641 0 0 1 5.577 2.4h6.89c2.283 0 3.87.47 4.72 1.4.85.93 1.07 2.28.66 4.01-.42 1.78-1.28 3.08-2.56 3.87-1.28.79-2.98 1.19-5.1 1.19h-1.3l-.52 3.3a.641.641 0 0 1-.633.54zm.89-5.17h1.05c1.52 0 2.62-.31 3.3-.93.68-.62 1.1-1.58 1.26-2.88.15-1.22-.02-2.1-.5-2.64-.48-.54-1.3-.81-2.46-.81H9.1l-.53 3.35-.48 3.91z" />
    </svg>
  );
}

function StripeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
    </svg>
  );
}

function ApplePayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GooglePayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.68 0 5.22 1.04 7.13 2.93l-2.83 2.83A5.978 5.978 0 0 0 12 6c-1.66 0-3.14.68-4.22 1.78L3.064 7.51zm-1.06 8.98A9.996 9.996 0 0 1 2 12c0-1.66.4-3.22 1.11-4.6l3.05 3.05A5.978 5.978 0 0 0 6 12c0 .99.24 1.92.66 2.74l-2.66 2.75zm3.52 3.52A9.996 9.996 0 0 0 12 22c2.68 0 5.22-1.04 7.13-2.93l-2.83-2.83A5.978 5.978 0 0 1 12 18c-1.66 0-3.14-.68-4.22-1.78l-3.22 3.31zm11.31-2.07A9.996 9.996 0 0 0 22 12c0-1.66-.4-3.22-1.11-4.6l-3.05 3.05A5.978 5.978 0 0 1 18 12c0-.99-.24-1.92-.66-2.74l2.66-2.75zM12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
    </svg>
  );
}

const ICON_CONFIG: Record<
  PaymentMethod,
  { bg: string; text: string; Icon: ComponentType<{ className?: string }> }
> = {
  "Credit/Debit Card": {
    bg: "bg-slate-100",
    text: "text-slate-700",
    Icon: CreditCard,
  },
  Paypal: {
    bg: "bg-[#003087]/10",
    text: "text-[#003087]",
    Icon: PaypalIcon,
  },
  Stripe: {
    bg: "bg-[#635bff]/10",
    text: "text-[#635bff]",
    Icon: StripeIcon,
  },
  Bank: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    Icon: Landmark,
  },
  "Apple Pay": {
    bg: "bg-slate-900/10",
    text: "text-slate-900",
    Icon: ApplePayIcon,
  },
  "Google Pay": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    Icon: GooglePayIcon,
  },
};

export function PaymentMethodIcons({
  methods,
  variant = "default",
  maxVisible,
}: {
  methods?: PaymentMethod[];
  variant?: "default" | "compact";
  maxVisible?: number;
}) {
  if (!methods?.length) {
    return <span className="text-slate-300">—</span>;
  }

  const isCompact = variant === "compact";
  const boxSize = isCompact ? "h-6 w-6 shrink-0" : "h-7 w-7 shrink-0";
  const iconSize = isCompact ? "h-3 w-3" : "h-3.5 w-3.5";
  const gap = isCompact ? "gap-1" : "gap-1.5";
  const visibleLimit = maxVisible ?? methods.length;
  const visibleMethods = methods.slice(0, visibleLimit);
  const hiddenCount = methods.length - visibleMethods.length;
  const allLabels = methods.map((method) => PAYMENT_LABELS[method]).join(", ");

  return (
    <div
      className={`flex items-center ${isCompact ? "flex-nowrap" : "flex-wrap"} ${gap}`}
      title={allLabels}
    >
      {visibleMethods.map((method) => {
        const { bg, text, Icon } = ICON_CONFIG[method];
        return (
          <span
            key={method}
            title={PAYMENT_LABELS[method]}
            aria-label={PAYMENT_LABELS[method]}
            className={`inline-flex ${boxSize} items-center justify-center rounded-md ${bg} ${text}`}
          >
            <Icon className={iconSize} />
          </span>
        );
      })}
      {hiddenCount > 0 && (
        <span
          title={methods
            .slice(visibleLimit)
            .map((method) => PAYMENT_LABELS[method])
            .join(", ")}
          className={`inline-flex ${boxSize} items-center justify-center rounded-md bg-slate-100 text-[10px] font-bold text-slate-600`}
        >
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}

export function vendorInStock(row: {
  is_stock?: boolean;
  status?: string;
}): boolean {
  if (typeof row.is_stock === "boolean") return row.is_stock;
  if (!row.status) return false;
  return /in\s*stock/i.test(row.status);
}
