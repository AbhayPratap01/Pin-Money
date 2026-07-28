import { Link } from "react-router-dom";
import { FaCheck, FaArrowRight } from "react-icons/fa";

const STEPS = [
  { num: 1, label: "Choose Loan", path: "/products?onboarding=true" },
  { num: 2, label: "Apply Now", path: "/loan-application?onboarding=true" },
  { num: 3, label: "CIBIL Score", path: "/cibil-score?onboarding=true" },
  { num: 4, label: "EMI Planner", path: "/emi-calculator?onboarding=true" },
  { num: 5, label: "Dashboard", path: "/dashboard" },
];

function OnboardingBanner({ currentStep }) {
  return (
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 border-b border-emerald-700/40">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <p className="text-xs text-emerald-300 font-bold uppercase tracking-widest text-center mb-3">
          🎉 Welcome! Complete your loan profile setup
        </p>
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {STEPS.map((step, idx) => {
            const isDone = step.num < currentStep;
            const isActive = step.num === currentStep;
            const isUpcoming = step.num > currentStep;
            return (
              <div key={step.num} className="flex items-center gap-1.5">
                <div
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                    isDone
                      ? "bg-emerald-600 text-white"
                      : isActive
                      ? "bg-white text-emerald-900 shadow-lg shadow-white/10 ring-2 ring-emerald-400"
                      : "bg-white/10 text-slate-400"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      isDone
                        ? "bg-emerald-700 text-white"
                        : isActive
                        ? "bg-emerald-500 text-white"
                        : "bg-white/20 text-slate-400"
                    }`}
                  >
                    {isDone ? <FaCheck className="text-[9px]" /> : step.num}
                  </span>
                  {step.label}
                </div>
                {idx < STEPS.length - 1 && (
                  <FaArrowRight className={`text-[10px] ${isUpcoming ? "text-slate-600" : "text-emerald-400"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OnboardingBanner;
