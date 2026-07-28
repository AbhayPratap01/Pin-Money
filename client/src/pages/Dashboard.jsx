import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getLoanApplications } from "../services/loanService";
import { getProfile } from "../services/authService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaDownload, 
  FaFileAlt, 
  FaCalculator, 
  FaSignal, 
  FaArrowRight 
} from "react-icons/fa";

function getLoanId(loan) {
  const id = loan?._id || loan?.id;
  if (!id) return "N/A";
  const idStr = String(id);
  return idStr.length > 8 ? `PM-${idStr.slice(-8).toUpperCase()}` : idStr;
}

function Dashboard() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  const [loans, setLoans] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [loansData, profileData] = await Promise.all([
          getLoanApplications(),
          getProfile()
        ]);
        setLoans(Array.isArray(loansData) ? loansData : []);
        setProfile(profileData?.user || null);
      } catch (err) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [activeTab]); // reload data when activeTab changes

  // Stats
  const stats = {
    pending: loans.filter((l) => l.status === "Pending").length,
    approved: loans.filter((l) => l.status === "Approved").length,
    rejected: loans.filter((l) => l.status === "Rejected").length,
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-6 pb-2">
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            {activeTab === "overview" ? "Dashboard" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Manage your applications, check schedules, and verify profile settings.
          </p>
        </div>
        <Link to="/loan-application" className="btn-primary shrink-0 w-full sm:w-auto">
          Apply New Loan
        </Link>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
        >
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6 md:space-y-8">
              {/* Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 border border-slate-100 shadow-sm flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Pending Loans</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-2">{String(stats.pending).padStart(2, "0")}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center text-lg">
                    <FaClock />
                  </div>
                </div>

                <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 border border-slate-100 shadow-sm flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Approved Loans</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-2">{String(stats.approved).padStart(2, "0")}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-500 flex items-center justify-center text-lg">
                    <FaCheckCircle />
                  </div>
                </div>

                <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 border border-slate-100 shadow-sm flex items-center justify-between gap-4 sm:col-span-2 md:col-span-1">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Rejected Loans</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-2">{String(stats.rejected).padStart(2, "0")}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center text-lg">
                    <FaTimesCircle />
                  </div>
                </div>
              </div>

              {/* Table of Latest Applications */}
              <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 md:px-6 py-4 md:py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-800">Recent Applications</h3>
                  <Link to="/dashboard?tab=applications" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                    View All <FaArrowRight />
                  </Link>
                </div>
                {loans.length === 0 ? (
                  <div className="px-6 py-12 md:py-16 text-center text-slate-400">
                    <p className="font-semibold text-sm">No applications submitted yet.</p>
                    <Link to="/loan-application" className="text-xs text-emerald-600 underline mt-1 inline-block">Apply for your first loan now</Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                        <tr>
                          <th className="px-4 md:px-6 py-3 md:py-4">Application ID</th>
                          <th className="px-4 md:px-6 py-3 md:py-4">Loan Type</th>
                          <th className="px-4 md:px-6 py-3 md:py-4">Amount</th>
                          <th className="px-4 md:px-6 py-3 md:py-4 hidden sm:table-cell">Applied Date</th>
                          <th className="px-4 md:px-6 py-3 md:py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {loans.slice(0, 3).map((loan) => (
                          <tr key={getLoanId(loan)} className="hover:bg-slate-50/50">
                            <td className="px-4 md:px-6 py-3 md:py-4 font-bold text-slate-700">{getLoanId(loan)}</td>
                            <td className="px-4 md:px-6 py-3 md:py-4">{loan.loanDetails?.type || "—"}</td>
                            <td className="px-4 md:px-6 py-3 md:py-4">{formatCurrency(loan.loanDetails?.amount || 0)}</td>
                            <td className="px-4 md:px-6 py-3 md:py-4 hidden sm:table-cell">{formatDate(loan.createdAt)}</td>
                            <td className="px-4 md:px-6 py-3 md:py-4">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                loan.status === "Approved" ? "bg-emerald-50 border border-emerald-200 text-emerald-700" :
                                loan.status === "Rejected" ? "bg-rose-50 border border-rose-200 text-rose-700" :
                                "bg-amber-50 border border-amber-200 text-amber-700"
                              }`}>
                                {loan.status === "Approved" && <FaCheckCircle />}
                                {loan.status === "Rejected" && <FaTimesCircle />}
                                {loan.status === "Pending" && <FaClock />}
                                {loan.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quick Tools & Downloads */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Free CIBIL Check widget */}
                <div className="bg-slate-900 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-800 flex flex-col justify-between items-start relative overflow-hidden min-h-[200px]">
                  <div className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl" />
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Credit Score Check</span>
                    <h3 className="text-xl font-bold">Check CIBIL Score For Free</h3>
                    <p className="text-slate-400 text-xs max-w-sm leading-relaxed">Checking score doesn't impact credit health. Get direct score reports in seconds.</p>
                  </div>
                  {profile?.cibilScore ? (
                    <div className="mt-6 flex items-center gap-3">
                      <span className="text-2xl font-black text-emerald-400">{profile.cibilScore}</span>
                      <span className="text-xs text-slate-400">Your checked score is active.</span>
                    </div>
                  ) : (
                    <Link
                      to="/cibil-score"
                      className="mt-6 btn-primary text-xs px-5 py-2.5"
                    >
                      Check Score Now <FaArrowRight />
                    </Link>
                  )}
                </div>

                {/* Quick calculators / statements */}
                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col justify-between items-start">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tools & Downloads</span>
                    <h3 className="text-xl font-bold text-slate-800">Interest Rates & EMI Planner</h3>
                    <p className="text-slate-500 text-xs max-w-sm leading-relaxed">Calculate exact Monthly EMI payouts using live sliders with interest adjustments.</p>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
                    <Link
                      to="/emi-calculator"
                      className="flex-1 btn-outline rounded-2xl py-3 text-xs text-center"
                    >
                      <FaCalculator /> Open EMI Calculator
                    </Link>
                    <button
                      onClick={() => toast.success("Simulated statement download started!")}
                      className="btn-dark rounded-2xl py-3 text-xs"
                    >
                      <FaDownload /> Download Statement
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MY APPLICATIONS TAB */}
          {activeTab === "applications" && (
            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-5 md:p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">All Loan Applications</h3>
              {loans.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="font-semibold text-sm">No applications found.</p>
                  <Link to="/loan-application" className="text-xs text-emerald-600 underline mt-1 inline-block">Apply for a new loan</Link>
                </div>
              ) : (
                <div className="space-y-4 md:space-y-5">
                  {loans.map((loan) => (
                    <div 
                      key={getLoanId(loan)}
                      className="border border-slate-100 rounded-2xl md:rounded-3xl p-5 md:p-6 hover:shadow-lg hover:shadow-slate-100/50 transition duration-300 grid md:grid-cols-4 items-center gap-4 md:gap-6 bg-slate-50/30"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-400">APPLICATION ID</span>
                        <p className="font-bold text-slate-800 text-base">{getLoanId(loan)}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-400">LOAN SPECIFICATIONS</span>
                        <p className="font-semibold text-slate-700 text-sm">{loan.loanDetails?.type || "—"}</p>
                        <p className="text-xs text-slate-500">{formatCurrency(loan.loanDetails?.amount || 0)} for {loan.loanDetails?.tenure || "—"} Years</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-400">SUBMITTED ON</span>
                        <p className="font-medium text-slate-600 text-sm">{formatDate(loan.createdAt)}</p>
                      </div>
                      <div className="flex md:justify-end">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border ${
                          loan.status === "Approved" ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
                          loan.status === "Rejected" ? "bg-rose-50 border-rose-200 text-rose-700" :
                          "bg-amber-50 border-amber-200 text-amber-700"
                        }`}>
                          {loan.status === "Approved" && <FaCheckCircle />}
                          {loan.status === "Rejected" && <FaTimesCircle />}
                          {loan.status === "Pending" && <FaClock />}
                          {loan.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EMI SCHEDULE TAB */}
          {activeTab === "emi" && (
            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-5 md:p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Upcoming Installment Schedule</h3>
              {loans.filter((l) => l.status === "Approved").length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="font-semibold text-sm">No approved/active loans found to generate schedules.</p>
                  <p className="text-xs text-slate-400 mt-1">Schedules are generated once your loan application gets approved.</p>
                </div>
              ) : (
                <div className="space-y-6 md:space-y-8">
                  {loans.filter((l) => l.status === "Approved").map((approvedLoan) => {
                    const principal = Number(approvedLoan.loanDetails?.amount || 0);
                    const tenureYrs = Number(approvedLoan.loanDetails?.tenure || 1);
                    const monthlyRate = 0.105 / 12; // 10.5% rate
                    const totalMonths = tenureYrs * 12;
                    const emi = Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1));

                    const scheduleList = Array.from({ length: 5 }, (_, idx) => {
                      const date = new Date();
                      date.setMonth(date.getMonth() + idx + 1);
                      return {
                        installmentNum: idx + 1,
                        dueDate: date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
                        amount: emi,
                        principalPortion: Math.round(emi * 0.7),
                        interestPortion: Math.round(emi * 0.3),
                        status: idx === 0 ? "Paid" : "Upcoming",
                      };
                    });

                    return (
                      <div key={getLoanId(approvedLoan)} className="border border-slate-100 rounded-2xl md:rounded-3xl overflow-hidden">
                        <div className="bg-slate-50 px-5 md:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-sm font-bold text-slate-700">{approvedLoan.loanDetails?.type} ({getLoanId(approvedLoan)})</span>
                          <span className="text-xs font-bold text-slate-500">Interest Rate: 10.5% p.a.</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold border-b border-slate-100">
                              <tr>
                                <th className="px-6 py-3">Installment No.</th>
                                <th className="px-6 py-3">Due Date</th>
                                <th className="px-6 py-3">Total Due</th>
                                <th className="px-6 py-3">Principal</th>
                                <th className="px-6 py-3">Interest</th>
                                <th className="px-6 py-3">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-semibold text-xs">
                              {scheduleList.map((sch) => (
                                <tr key={sch.installmentNum}>
                                  <td className="px-6 py-4 text-slate-800">#{sch.installmentNum}</td>
                                  <td className="px-4 md:px-6 py-3 md:py-4">{sch.dueDate}</td>
                                  <td className="px-6 py-4 text-slate-800">{formatCurrency(sch.amount)}</td>
                                  <td className="px-6 py-4 text-slate-500">{formatCurrency(sch.principalPortion)}</td>
                                  <td className="px-6 py-4 text-slate-500">{formatCurrency(sch.interestPortion)}</td>
                                  <td className="px-4 md:px-6 py-3 md:py-4">
                                    <span className={`px-2.5 py-1 rounded-full font-bold ${
                                      sch.status === "Paid" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-500"
                                    }`}>
                                      {sch.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === "documents" && (
            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-5 md:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Uploaded Verification Documents</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">Your documents are processed securely under absolute encryption parameters.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="border border-slate-100 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-slate-50/50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="text-2xl md:text-3xl text-emerald-600 shrink-0"><FaFileAlt /></div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-slate-800">Identity Proof (Aadhaar / Passport)</p>
                      <p className="text-xs text-slate-400 mt-0.5">Uploaded during registration</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">Verified</span>
                </div>

                <div className="border border-slate-100 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-slate-50/50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="text-2xl md:text-3xl text-emerald-600 shrink-0"><FaFileAlt /></div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-slate-800">PAN Verification Card</p>
                      <p className="text-xs text-slate-400 mt-0.5">Uploaded during registration</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">Verified</span>
                </div>

                {loans.map((loan) => (
                  <div key={getLoanId(loan)} className="border border-slate-100 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-slate-50/50 flex items-center justify-between gap-3 md:col-span-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="text-2xl md:text-3xl text-emerald-600 shrink-0"><FaFileAlt /></div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-800">{loan.loanDetails?.type} Verification Doc ({getLoanId(loan)})</p>
                        <p className="text-xs text-slate-400 mt-0.5">Submitted: {formatDate(loan.createdAt)}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      loan.status === "Approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      loan.status === "Rejected" ? "bg-rose-50 text-rose-600 border-rose-100" :
                      "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                      {loan.status === "Approved" ? "Verified" : loan.status === "Rejected" ? "Rejected" : "In Review"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            profile ? (
            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6 md:space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-lg md:text-xl shrink-0">
                  {profile.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{profile.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">Registered Customer since {profile.createdAt ? formatDate(profile.createdAt) : "—"}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 md:gap-6 pt-6 border-t border-slate-100">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400">MOBILE NUMBER</span>
                  <p className="font-semibold text-slate-700">{profile.mobile}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400">EMAIL ADDRESS</span>
                  <p className="font-semibold text-slate-700">{profile.email}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400">PAN NUMBER</span>
                  <p className="font-semibold text-slate-700 uppercase">{profile.pan}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400">AADHAAR NUMBER</span>
                  <p className="font-semibold text-slate-700">{profile.aadhaar}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400">PERSISTED CIBIL SCORE</span>
                  <p className="font-semibold text-slate-700 flex items-center gap-2">
                    {profile.cibilScore ? (
                      <>
                        <span className="text-emerald-500 font-extrabold">{profile.cibilScore}</span>
                        <span className="text-xs text-slate-400">(Good Standing)</span>
                      </>
                    ) : (
                      <Link to="/cibil-score" className="text-emerald-600 hover:underline flex items-center gap-1">
                        <FaSignal /> Check score now
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            </div>
            ) : (
              <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-8 text-center text-slate-500">
                <p className="font-semibold">Unable to load profile data.</p>
                <p className="text-sm mt-2">Please refresh the page or try logging in again.</p>
              </div>
            )
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6 md:space-y-8">
              <h3 className="text-xl font-bold text-slate-800">Account Preferences</h3>

              <form onSubmit={(e) => { e.preventDefault(); toast.success("Settings saved successfully!"); }} className="space-y-6 max-w-lg">
                <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                  Notification Mode
                  <select className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-emerald-500 focus:bg-white transition text-slate-700">
                    <option>Email & SMS Alerts (Recommended)</option>
                    <option>Email Only</option>
                    <option>SMS Only</option>
                    <option>Disable Alerts</option>
                  </select>
                </label>

                <div className="flex items-center justify-between p-4 md:p-5 border border-slate-100 rounded-2xl bg-slate-50/30 gap-4">
                  <div>
                    <p className="font-bold text-sm text-slate-700">Enable Two-Factor Verification</p>
                    <p className="text-xs text-slate-400 mt-1">Adds extra login protection security</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-emerald-600 cursor-pointer shrink-0" />
                </div>

                <button type="submit" className="btn-dark rounded-2xl">
                  Save Settings
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;