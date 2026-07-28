import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserAlt, FaHome, FaBriefcase, FaBuilding, FaArrowRight, FaCheck } from "react-icons/fa";
import OnboardingBanner from "../components/OnboardingBanner";

const products = [
  {
    type: "Personal Loan",
    icon: <FaUserAlt className="text-3xl text-emerald-500" />,
    limit: "Up to ₹40 Lakhs",
    desc: "Get quick funds for marriage, medical emergencies, travel, or home renovation with minimal documentation and fast approval.",
    features: ["No collateral required", "Interest rates from 10.5% p.a.", "Flexible tenure up to 5 years", "Disbursal within 24 hours"],
  },
  {
    type: "Home Loan",
    icon: <FaHome className="text-3xl text-emerald-500" />,
    limit: "Up to ₹10 Crores",
    desc: "Make your dream home a reality with competitive interest rates, flexible EMI options, and quick online approval process.",
    features: ["Attractive interest rates", "Tenure up to 30 years", "Tax benefits under Section 24 & 80C", "Easy balance transfer facility"],
  },
  {
    type: "Business Loan",
    icon: <FaBriefcase className="text-3xl text-emerald-500" />,
    limit: "Up to ₹5 Crores",
    desc: "Fuel your business growth, manage working capital, purchase machinery, or expand operations with customized credit schemes.",
    features: ["Collateral-free loans up to ₹50L", "Minimal documentation", "Flexible structured repayments", "Quick approval within 48 hours"],
  },
  {
    type: "Loan Against Property",
    icon: <FaBuilding className="text-3xl text-emerald-500" />,
    limit: "Lowest Interest Rates",
    desc: "Unlock the hidden potential of your residential or commercial property to get high-value loans with longer repayment tenures.",
    features: ["Multi-purpose loan facility", "Lower EMIs vs personal loans", "Tenure up to 15 years", "Quick valuation & processing"],
  },
];

function Products() {
  const [searchParams] = useSearchParams();
  const isOnboarding = searchParams.get("onboarding") === "true";

  return (
    <div className="bg-slate-50 min-h-screen">
      {isOnboarding && <OnboardingBanner currentStep={1} />}

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {isOnboarding ? (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
              <span className="inline-block bg-emerald-100 text-emerald-800 font-bold text-sm px-4 py-2 rounded-full border border-emerald-200">
                Step 1 of 4 · Choose your preferred loan type
              </span>
            </motion.div>
          ) : null}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight"
          >
            Our Loan <span className="text-emerald-600">Products</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 mt-4 text-lg"
          >
            {isOnboarding
              ? "Select the loan product that best matches your needs — you can apply right away."
              : "We provide the best loan solutions tailored to your financial goals."}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {products.map((prod, idx) => (
            <motion.div
              key={prod.type}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-white rounded-4xl p-8 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-950/5 transition duration-300 flex flex-col justify-between group hover:border-emerald-200"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-3xl bg-emerald-50/80 group-hover:scale-110 transition duration-300">
                    {prod.icon}
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                    {prod.limit}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition duration-200">
                  {prod.type}
                </h3>
                <p className="text-slate-500 mt-4 leading-relaxed text-sm">{prod.desc}</p>

                <div className="border-t border-slate-100 my-6 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Key Benefits</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {prod.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-slate-600 text-sm">
                        <FaCheck className="text-emerald-500 mt-1 flex-shrink-0 text-xs" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to={`/loan-application?type=${encodeURIComponent(prod.type)}${isOnboarding ? "&onboarding=true" : ""}`}
                className="w-full btn-dark py-4 shadow-lg shadow-black/5 mt-4"
              >
                {isOnboarding ? "Select & Apply" : "Apply Now"}
                <FaArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;