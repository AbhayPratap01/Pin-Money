import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { checkCibilScore } from "../services/loanService";
import { getProfile } from "../services/authService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTrophy, FaRedo, FaArrowRight } from "react-icons/fa";
import OnboardingBanner from "../components/OnboardingBanner";

function CibilScore() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOnboarding = searchParams.get("onboarding") === "true";

  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    pan: user?.pan || "",
    dob: "",
  });
  const [score, setScore] = useState(null);
  const [checking, setChecking] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("Please log in to check your CIBIL score");
      navigate("/login");
      return;
    }
    async function loadProfile() {
      try {
        const data = await getProfile();
        if (data?.user?.cibilScore) setScore(data.user.cibilScore);
        if (data?.user) {
          setFormData(prev => ({
            ...prev,
            name: data.user.name || prev.name,
            mobile: data.user.mobile || prev.mobile,
            pan: data.user.pan || prev.pan,
          }));
        }
      } catch { /* silent */ }
      finally { setLoadingProfile(false); }
    }
    loadProfile();
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCheck = async (e) => {
    e.preventDefault();
    const { name, mobile, pan, dob } = formData;
    if (!name || !mobile || !pan || !dob) { toast.error("Please fill all details"); return; }
    setChecking(true);
    try {
      const res = await checkCibilScore(formData);
      setScore(res.cibilScore);
      toast.success("CIBIL Score retrieved successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Error checking CIBIL score");
    } finally { setChecking(false); }
  };

  const getScoreInfo = (s) => {
    if (s >= 750) return { label: "Excellent", color: "text-emerald-500", stroke: "#10b981", bg: "bg-emerald-50 border-emerald-200 text-emerald-800", desc: "Great! Excellent credit history. You qualify for the best interest rates available." };
    if (s >= 700) return { label: "Good", color: "text-green-500", stroke: "#22c55e", bg: "bg-green-50 border-green-200 text-green-800", desc: "Good credit profile. You'll qualify for most loan programs with competitive rates." };
    if (s >= 600) return { label: "Average", color: "text-yellow-500", stroke: "#eab308", bg: "bg-yellow-50 border-yellow-200 text-yellow-800", desc: "Fair score. You may experience slightly higher interest rates on loans." };
    return { label: "Needs Improvement", color: "text-red-500", stroke: "#ef4444", bg: "bg-red-50 border-red-200 text-red-800", desc: "Poor score. Consider paying off outstanding balances to improve eligibility." };
  };

  if (loadingProfile) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
    </div>
  );

  const scoreInfo = score ? getScoreInfo(score) : null;
  const inputCls = "rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-emerald-500 focus:bg-white transition w-full";

  return (
    <div className="bg-slate-50 min-h-screen">
      {isOnboarding && <OnboardingBanner currentStep={3} />}

      <div className="max-w-4xl mx-auto px-6 py-16">
        {isOnboarding && (
          <div className="mb-8 text-center">
            <span className="inline-block bg-emerald-100 text-emerald-800 font-bold text-sm px-4 py-2 rounded-full border border-emerald-200">
              Step 3 of 4 · Check your CIBIL credit score for free
            </span>
          </div>
        )}

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Check Your CIBIL Score</h1>
          <p className="text-slate-500 mt-3">Safe, secure, and 100% free. Checking doesn't affect your score.</p>
        </div>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
          {/* Form */}
          <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-xl shadow-slate-900/5">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Enter Your Details</h3>
            <form onSubmit={handleCheck} className="space-y-5">
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                Full Name
                <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Enter full name" className={inputCls} />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                Mobile Number
                <input name="mobile" value={formData.mobile} onChange={handleChange} type="text" placeholder="10-digit mobile number" className={inputCls} />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                  PAN Number
                  <input name="pan" value={formData.pan} onChange={handleChange} type="text" placeholder="ABCDE1234F" className={`${inputCls} uppercase`} />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                  Date of Birth
                  <input name="dob" value={formData.dob} onChange={handleChange} type="date" className={inputCls} />
                </label>
              </div>
              <button type="submit" disabled={checking} className="w-full mt-4 btn-primary py-4 font-bold shadow-lg shadow-emerald-600/10 disabled:opacity-50">
                {checking ? "Checking CIBIL..." : "Check My CIBIL Score"}
              </button>
            </form>
          </div>

          {/* Score Result */}
          <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-xl shadow-slate-900/5 flex flex-col items-center justify-center min-h-[400px]">
            {score ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full flex flex-col items-center">
                {/* Circular gauge */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke={scoreInfo.stroke} strokeWidth="8"
                      strokeDasharray="251" strokeDashoffset={251 - (251 * (score - 300)) / 600}
                      strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-slate-800">{score}</span>
                    <span className={`text-sm font-bold mt-1 ${scoreInfo.color}`}>{scoreInfo.label}</span>
                  </div>
                </div>

                <div className={`mt-6 rounded-2xl p-4 border text-sm text-center leading-relaxed ${scoreInfo.bg}`}>
                  {scoreInfo.desc}
                </div>

                <div className="w-full text-left mt-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">What you can do</h4>
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Access pre-approved loan offers with lower interest rate.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Keep maintaining timely repayments for score improvement.</span>
                  </div>
                </div>

                <div className="mt-8 w-full flex flex-col gap-3">
                  {isOnboarding ? (
                    <Link to="/emi-calculator?onboarding=true" className="w-full btn-primary py-4 font-bold text-center">
                      Continue to EMI Planner <FaArrowRight />
                    </Link>
                  ) : (
                    <Link to="/products" className="w-full btn-dark py-3.5 text-sm text-center">
                      View Loan Offers
                    </Link>
                  )}
                  <button onClick={() => setScore(null)} className="rounded-3xl border border-slate-200 text-slate-600 hover:bg-slate-50 py-3 px-4 font-semibold text-sm flex items-center justify-center gap-1.5 transition">
                    <FaRedo /> Check Again
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mx-auto text-2xl">
                  <FaTrophy />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Your Score Awaits</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">Fill the form on the left to instantly retrieve your free CIBIL credit score.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CibilScore;