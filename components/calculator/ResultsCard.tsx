"use client";
import React from "react";
import { BadgeDollarSign, Coins, LineChart } from "lucide-react";

export type CalculationResult = {
  goldWeightValue: number;
  shopProfitPerGram: number;
  totalProfitAmount: number;
  marginPercentage: number;
  marginStatus: "good" | "medium" | "high";
  karatPricePerGram: number;
  selectedKarat: string;
  weight: number;
};

export function ResultsCard({ result, language }: { result: CalculationResult; language: "en" | "ar" }) {
  const statusStyles = {
    good: {
      badge: "bg-green-100 text-green-700",
      ring: "ring-green-200",
    },
    medium: {
      badge: "bg-amber-100 text-amber-700",
      ring: "ring-amber-200",
    },
    high: {
      badge: "bg-red-100 text-red-700",
      ring: "ring-red-200",
    },
  } as const;

  const current = statusStyles[result.marginStatus];
  const marginText =
    result.marginStatus === "good"
      ? "Low Margin – Good Deal"
      : result.marginStatus === "medium"
      ? "Medium Margin"
      : "High Margin";

  return (
    <section className={`mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm text-center ${current.ring}`}>
      <div className="flex items-center justify-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-green-600 ring-1 ring-green-200">✓</span>
        <span className="text-sm text-neutral">Calculation Results</span>
      </div>
      <div className="mt-2 flex items-center justify-center">
        <span className={`rounded-md px-3 py-1 text-xs font-medium ${current.badge}`}>{marginText}</span>
      </div>

      {/* Profit margin headline */}
      <div className="mt-4 rounded-xl bg-white p-6 text-center shadow-sm">
        <div className="text-xs text-neutral/60">Profit Margin</div>
        <div className="mt-1 text-3xl font-semibold tracking-tight">{result.marginPercentage.toFixed(2)}%</div>
      </div>

      {/* Market rate amber card */}
      <div className="mt-6 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-5 text-center text-white shadow-sm">
        <div className="text-xs opacity-90">Market Rate – {result.selectedKarat.toUpperCase()} Gold</div>
        <div className="mt-1 text-2xl font-bold">AED {result.karatPricePerGram.toFixed(2)}</div>
        <div className="text-[11px] opacity-90">per gram</div>
      </div>

      {/* Metric tiles */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-amber-100 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-neutral/70">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <Coins className="h-5 w-5" />
            </span>
            Official Gold Value
          </div>
          <div className="mt-2 text-xl font-semibold">AED {result.goldWeightValue.toFixed(2)}</div>
          <div className="text-xs text-neutral/60">{result.karatPricePerGram.toFixed(2)} × {result.weight}g</div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-blue-100 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-neutral/70">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <BadgeDollarSign className="h-5 w-5" />
            </span>
            Shop Profit Per Gram
          </div>
          <div className="mt-2 text-xl font-semibold">AED {result.shopProfitPerGram.toFixed(2)}</div>
          <div className="text-xs text-neutral/60">Total ÷ {result.weight}g</div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-green-100 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-neutral/70">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-700">
              <LineChart className="h-5 w-5" />
            </span>
            Total Shop Profit
          </div>
          <div className="mt-2 text-xl font-semibold">AED {result.totalProfitAmount.toFixed(2)}</div>
          <div className="text-xs text-neutral/60">Shop − Official value</div>
        </div>
      </div>

      {/* Good deal explanation */}
      <div className="mt-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-amber-200 text-center">
        <div className="font-semibold text-amber-700">{result.marginStatus === "good" ? "Good deal!" : result.marginStatus === "medium" ? "Fair deal" : "High margin"}</div>
        <p className="mt-2 text-sm text-neutral/70">
          The official gold value is AED {result.goldWeightValue.toFixed(2)}, and the shop is adding AED {result.shopProfitPerGram.toFixed(2)} per gram,
          totaling AED {result.totalProfitAmount.toFixed(2)}. This is considered a {result.marginStatus} margin.
        </p>
      </div>

      {/* Bottom insights strip */}
      <div className="mt-6 rounded-xl bg-slate-900 px-4 py-5 text-slate-100 text-center">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-slate-800 p-4">
            <div className="text-xs text-slate-300">Shop price is</div>
            <div className="mt-1 text-lg font-semibold">{result.marginPercentage.toFixed(1)}%</div>
            <div className="text-[11px] text-slate-400">above today's rate</div>
          </div>
          <div className="rounded-lg bg-slate-800 p-4">
            <div className="text-xs text-slate-300">Typical UAE making charges</div>
            <div className="mt-1 text-lg font-semibold">30–60</div>
            <div className="text-[11px] text-slate-400">AED per gram</div>
          </div>
          <div className="rounded-lg bg-slate-800 p-4">
            <div className="text-xs text-slate-300">Recommendation</div>
            <div className="mt-1 text-lg">★★★★★</div>
          </div>
        </div>
      </div>
    </section>
  );
}
