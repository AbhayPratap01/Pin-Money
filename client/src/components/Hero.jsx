import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaStar } from "react-icons/fa";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#052e16] via-[#0f3f22] to-[#166534] text-white">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-300/15 blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">

          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-200">
              India’s Trusted Loan Partner
            </span>

            <h1 className="mt-8 text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Loans Made <span className="text-emerald-300">Simple.</span>
              <br />
              Dreams Made <span className="text-emerald-200">Possible.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-slate-100 text-lg leading-8">
              Personal Loans, Home Loans, Business Loans and Loan Against Property with instant approvals, clear guidance, and flexible repayment plans crafted for every customer.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/loan-application" className="btn-primary px-7 py-4 text-sm shadow-xl shadow-emerald-600/20">
                Apply Now
                <FaArrowRight />
              </Link>
              <Link to="/cibil-score" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-4 text-sm text-white transition hover:bg-white hover:text-slate-950">
                Check CIBIL
              </Link>
              <Link to="/emi-calculator" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-4 text-sm text-white transition hover:bg-white hover:text-slate-950">
                EMI Calculator
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-14 text-sm text-slate-100">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/5">
                <div className="flex items-center gap-3 text-emerald-300">
                  <FaCheckCircle />
                  <span className="font-medium">Fast approval in minutes</span>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/5">
                <div className="flex items-center gap-3 text-emerald-300">
                  <FaCheckCircle />
                  <span className="font-medium">Transparent repayment plans</span>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/5">
                <div className="flex items-center gap-3 text-emerald-300">
                  <FaCheckCircle />
                  <span className="font-medium">Dedicated relationship managers</span>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/5">
                <div className="flex items-center gap-3 text-emerald-300">
                  <FaCheckCircle />
                  <span className="font-medium">100% digital onboarding</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity:0,x:40 }}
            animate={{ opacity:1,x:0 }}
            transition={{ duration:0.8 }}
          >

            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700"
              alt=""
              className="rounded-xl shadow-2xl"
            />

          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default Hero;