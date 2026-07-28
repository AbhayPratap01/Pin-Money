import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { FaArrowRight } from "react-icons/fa";
import OnboardingBanner from "../components/OnboardingBanner";

ChartJS.register(ArcElement, Tooltip, Legend);

function EMICalculator() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isOnboarding = searchParams.get("onboarding") === "true";

  const [amount, setAmount] = useState(1000000);
  const [interest, setInterest] = useState(10.5);
  const [tenure, setTenure] = useState(5);

  const emiDetails = useMemo(() => {
    const P = parseFloat(amount);
    const r = parseFloat(interest) / 12 / 100;
    const n = parseFloat(tenure) * 12;
    if (r === 0) return { monthlyEmi: Math.round(P / n), totalPayment: Math.round(P), totalInterest: 0 };
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    return {
      monthlyEmi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalPayment - P),
    };
  }, [amount, interest, tenure]);

  const chartData = {
    labels: ["Principal Amount", "Total Interest"],
    datasets: [{
      data: [amount, emiDetails.totalInterest],
      backgroundColor: ["#10b981", "#0ea5e9"],
      hoverBackgroundColor: ["#059669", "#0284c7"],
      borderWidth: 0,
    }],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 14, font: { size: 12, weight: "600", family: "Inter" }, padding: 20 },
      },
    },
    maintainAspectRatio: false,
  };

  const fmt = (val) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  const sliders = [
    { label: "Loan Amount", value: amount, setter: setAmount, min: 100000, max: 10000000, step: 50000, prefix: "₹", suffix: "", minLabel: "₹1 Lakh", maxLabel: "₹1 Crore", inputWidth: "w-36" },
    { label: "Interest Rate (p.a.)", value: interest, setter: setInterest, min: 5, max: 25, step: 0.1, prefix: "", suffix: "%", minLabel: "5% p.a.", maxLabel: "25% p.a.", inputWidth: "w-20" },
    { label: "Loan Tenure", value: tenure, setter: setTenure, min: 1, max: 30, step: 1, prefix: "", suffix: "Yrs", minLabel: "1 Year", maxLabel: "30 Years", inputWidth: "w-16" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {isOnboarding && <OnboardingBanner currentStep={4} />}

      <div className="max-w-6xl mx-auto px-6 py-16">
        {isOnboarding && (
          <div className="mb-8 text-center">
            <span className="inline-block bg-emerald-100 text-emerald-800 font-bold text-sm px-4 py-2 rounded-full border border-emerald-200">
              Step 4 of 4 · Estimate your monthly repayments before heading to your dashboard
            </span>
          </div>
        )}

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-slate-900">EMI Calculator</h1>
          <p className="text-slate-500 mt-3">Plan your monthly loan budget with our interactive calculator.</p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
          {/* Sliders */}
          <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-xl shadow-slate-900/5 space-y-8 flex flex-col justify-between">
            {sliders.map(({ label, value, setter, min, max, step, prefix, suffix, minLabel, maxLabel, inputWidth }) => (
              <div key={label} className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</span>
                  <div className="flex items-center gap-1">
                    {prefix && <span className="text-slate-400 font-bold">{prefix}</span>}
                    <input
                      type="number" value={value}
                      onChange={(e) => setter(Number(e.target.value))}
                      step={step}
                      className={`${inputWidth} bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5 font-bold text-right text-slate-700 focus:outline-none focus:border-emerald-500 text-sm`}
                    />
                    {suffix && <span className="text-slate-400 font-bold text-sm">{suffix}</span>}
                  </div>
                </div>
                <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setter(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>{minLabel}</span><span>{maxLabel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-xl shadow-slate-900/5 flex flex-col justify-between items-center">
            <div className="w-full space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-500">Monthly EMI</span>
                <span className="text-2xl font-black text-slate-800">{fmt(emiDetails.monthlyEmi)}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-500">Total Interest Payable</span>
                <span className="text-lg font-bold text-slate-800">{fmt(emiDetails.totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-500">Total Payment</span>
                <span className="text-lg font-bold text-slate-800">{fmt(emiDetails.totalPayment)}</span>
              </div>
            </div>

            <div className="relative w-full h-48 mt-8">
              <Pie data={chartData} options={chartOptions} />
            </div>

            {isOnboarding && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => navigate("/dashboard")}
                className="w-full mt-8 btn-primary py-4 font-bold shadow-lg shadow-emerald-600/15 flex items-center justify-center gap-2 text-sm"
              >
                🎉 Finish Onboarding & Go to Dashboard <FaArrowRight />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EMICalculator;