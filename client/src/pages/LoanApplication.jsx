import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { applyForLoan } from "../services/loanService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser, FaBriefcase, FaMoneyBillWave, FaFileUpload,
  FaArrowRight, FaArrowLeft, FaCheckCircle
} from "react-icons/fa";
import OnboardingBanner from "../components/OnboardingBanner";

function LoanApplication() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "Personal Loan";
  const isOnboarding = searchParams.get("onboarding") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("Please login to apply for a loan");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    fatherName: "",
    dob: "",
    mobile: user?.mobile || "",
    email: user?.email || "",
    pan: user?.pan || "",
    aadhaar: user?.aadhaar || "",
    occupation: "",
    companyName: "",
    monthlyIncome: "",
    salaryMode: "Bank Transfer",
    loanType: initialType,
    loanAmount: "",
    tenure: "5",
    purpose: "",
    documentName: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        mobile: user.mobile || "",
        email: user.email || "",
        pan: user.pan || "",
        aadhaar: user.aadhaar || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, documentName: e.target.files[0].name }));
    }
  };

  const nextStep = () => {
    if (step === 1) {
      const { name, fatherName, dob, mobile, email, pan, aadhaar } = formData;
      if (!name || !fatherName || !dob || !mobile || !email || !pan || !aadhaar) {
        toast.error("Please fill all personal details"); return;
      }
    } else if (step === 2) {
      const { occupation, companyName, monthlyIncome } = formData;
      if (!occupation || !companyName || !monthlyIncome) {
        toast.error("Please fill all employment details"); return;
      }
    } else if (step === 3) {
      const { loanAmount, purpose } = formData;
      if (!loanAmount || !purpose) {
        toast.error("Please fill all loan details"); return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.documentName) { toast.error("Please select a document to upload"); return; }
    setLoading(true);
    try {
      await applyForLoan({
        personalDetails: {
          name: formData.name, fatherName: formData.fatherName, dob: formData.dob,
          mobile: formData.mobile, email: formData.email, pan: formData.pan, aadhaar: formData.aadhaar,
        },
        employmentDetails: {
          occupation: formData.occupation, companyName: formData.companyName,
          monthlyIncome: formData.monthlyIncome, salaryMode: formData.salaryMode,
        },
        loanDetails: {
          type: formData.loanType, amount: formData.loanAmount,
          tenure: formData.tenure, purpose: formData.purpose,
        },
      });
      toast.success("Loan application submitted successfully!");
      if (isOnboarding) {
        navigate("/cibil-score?onboarding=true");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to submit loan application");
    } finally {
      setLoading(false);
    }
  };

  const stepsList = [
    { num: 1, label: "Personal Details", icon: <FaUser /> },
    { num: 2, label: "Employment Details", icon: <FaBriefcase /> },
    { num: 3, label: "Loan Specifications", icon: <FaMoneyBillWave /> },
    { num: 4, label: "Upload Documents", icon: <FaFileUpload /> },
  ];

  const inputCls = "rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-emerald-500 focus:bg-white transition w-full";

  if (!isAuthenticated) return null;

  return (
    <div className="bg-slate-50 min-h-screen">
      {isOnboarding && <OnboardingBanner currentStep={2} />}

      <div className="max-w-4xl mx-auto px-6 py-16">
        {isOnboarding && (
          <div className="mb-8 text-center">
            <span className="inline-block bg-emerald-100 text-emerald-800 font-bold text-sm px-4 py-2 rounded-full border border-emerald-200">
              Step 2 of 4 · Submit your loan application details
            </span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-12 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0 rounded-full" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 z-0 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
            />
            {stepsList.map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                  step >= s.num ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "bg-slate-100 text-slate-400"
                }`}>
                  {step > s.num ? <FaCheckCircle className="text-xl" /> : s.icon}
                </div>
                <span className={`mt-3 text-xs font-semibold hidden md:block ${step >= s.num ? "text-emerald-700 font-bold" : "text-slate-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-xl shadow-slate-900/5 min-h-[450px] flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Personal Details</h2>
                    <p className="text-sm text-slate-400 mt-1">Your personal information for identity verification.</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    {[
                      { label: "Full Name *", name: "name", placeholder: "Enter full name", type: "text" },
                      { label: "Father's Name *", name: "fatherName", placeholder: "Enter father's name", type: "text" },
                      { label: "Date of Birth *", name: "dob", placeholder: "", type: "date" },
                      { label: "Mobile Number *", name: "mobile", placeholder: "10-digit mobile number", type: "text" },
                      { label: "Email Address *", name: "email", placeholder: "Enter email", type: "email" },
                      { label: "PAN Number *", name: "pan", placeholder: "ABCDE1234F", type: "text" },
                    ].map((f) => (
                      <label key={f.name} className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                        {f.label}
                        <input name={f.name} value={formData[f.name]} onChange={handleChange} type={f.type} placeholder={f.placeholder} className={inputCls} />
                      </label>
                    ))}
                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600 md:col-span-2">
                      Aadhaar Number *
                      <input name="aadhaar" value={formData.aadhaar} onChange={handleChange} type="text" placeholder="12-digit Aadhaar number" className={inputCls} />
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Employment Details</h2>
                    <p className="text-sm text-slate-400 mt-1">Your source of income and employer information.</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                      Occupation *
                      <select name="occupation" value={formData.occupation} onChange={handleChange} className={inputCls}>
                        <option value="">Select Occupation</option>
                        <option>Salaried Employee</option>
                        <option>Self Employed Business</option>
                        <option>Professional (Doctor, CA)</option>
                        <option>Retired / Pensioner</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                      Company / Employer Name *
                      <input name="companyName" value={formData.companyName} onChange={handleChange} type="text" placeholder="Enter company name" className={inputCls} />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                      Monthly Take-home Salary (₹) *
                      <input name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} type="number" placeholder="e.g. 50000" className={inputCls} />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                      Salary Receive Mode *
                      <select name="salaryMode" value={formData.salaryMode} onChange={handleChange} className={inputCls}>
                        <option>Bank Transfer</option>
                        <option>Cash</option>
                        <option>Cheque</option>
                      </select>
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Loan Details</h2>
                    <p className="text-sm text-slate-400 mt-1">Specify the loan amount and purpose.</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                      Loan Type *
                      <select name="loanType" value={formData.loanType} onChange={handleChange} className={inputCls}>
                        <option>Personal Loan</option>
                        <option>Home Loan</option>
                        <option>Business Loan</option>
                        <option>Loan Against Property</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                      Loan Amount (₹) *
                      <input name="loanAmount" value={formData.loanAmount} onChange={handleChange} type="number" placeholder="Required amount" className={inputCls} />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                      Tenure (Years) *
                      <select name="tenure" value={formData.tenure} onChange={handleChange} className={inputCls}>
                        {["1","2","3","5","7","10","15","20","30"].map(y => <option key={y} value={y}>{y} {y === "1" ? "Year" : "Years"}</option>)}
                      </select>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                      Purpose of Loan *
                      <input name="purpose" value={formData.purpose} onChange={handleChange} type="text" placeholder="e.g. Home renovation" className={inputCls} />
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Upload Documents</h2>
                    <p className="text-sm text-slate-400 mt-1">Upload identity and income verification files (PAN, Salary slips, Form 16, etc.)</p>
                  </div>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-10 bg-slate-50 hover:border-emerald-500/50 transition cursor-pointer relative group">
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <FaFileUpload className="text-5xl text-slate-300 mb-4 group-hover:text-emerald-400 transition" />
                    <span className="font-semibold text-slate-700">Drag & Drop files here</span>
                    <span className="text-xs text-slate-400 mt-1">Accepts PDF, JPG, PNG up to 10 MB</span>
                    <span className="mt-4 text-xs bg-slate-200 hover:bg-emerald-100 text-slate-600 px-4 py-2 rounded-full font-semibold transition">Browse Files</span>
                  </div>
                  {formData.documentName && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-emerald-800 truncate max-w-md">✓ {formData.documentName}</span>
                      <button type="button" onClick={() => setFormData(p => ({ ...p, documentName: "" }))} className="text-xs text-red-500 font-bold hover:underline">Remove</button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 flex justify-between gap-4 border-t border-slate-100 pt-6">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 hover:bg-slate-50 transition">
                  <FaArrowLeft /> Back
                </button>
              ) : <div />}
              {step < 4 ? (
                <button type="button" onClick={nextStep} className="btn-dark px-7 py-3">
                  Continue <FaArrowRight />
                </button>
              ) : (
                <button type="submit" disabled={loading} className="btn-primary px-8 py-3.5 font-bold disabled:opacity-50">
                  {loading ? "Submitting..." : isOnboarding ? "Submit & Continue →" : "Submit Application"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoanApplication;