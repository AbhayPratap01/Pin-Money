import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "What is the eligibility for a personal loan?",
    answer: "Salaried individuals with a minimum monthly income of ₹25,000, aged between 21 and 60 years, and self-employed professionals with a stable income history can apply.",
  },
  {
    question: "What documents are required?",
    answer: "Standard documentation includes: PAN Card, Aadhaar Card, last 3 months' salary slips, last 6 months' bank statements, and address proof.",
  },
  {
    question: "How long does it take to get loan approved?",
    answer: "With Pin Money's digital validation, eligibility check and initial matching happen in minutes. Final loan approvals usually take between 24 and 48 hours.",
  },
  {
    question: "What is the interest rate?",
    answer: "Our interest rates are competitive, starting at 10.50% p.a. depending on your CIBIL rating, loan type, and tenure.",
  },
  {
    question: "Can I foreclose my loan?",
    answer: "Yes, you can foreclose your loan after the initial lock-in period as per RBI guidelines. Charges vary based on bank terms.",
  },
  {
    question: "Is my data safe with Pin Money?",
    answer: "Absolutely. All data is encrypted with industry-standard SSL/TLS protocols. We never share your personal information with third parties without your explicit consent.",
  },
];

function FAQSection({ dark = false, standalone = false }) {
  const [active, setActive] = useState(null);

  const bg = standalone ? "bg-transparent" : dark ? "bg-slate-900" : "bg-slate-50";
  const titleColor = dark ? "text-white" : "text-slate-900";
  const subtitleColor = dark ? "text-slate-400" : "text-slate-500";
  const cardBg = dark ? "bg-slate-800/60 border-slate-700" : "bg-white border-slate-100 shadow-sm";
  const questionColor = dark ? "text-slate-100" : "text-slate-800";
  const answerColor = dark ? "text-slate-400" : "text-slate-600";
  const chevronColor = dark ? "text-slate-400" : "text-slate-400";
  const activeBg = dark ? "bg-slate-800" : "bg-emerald-50/40";

  const content = (
    <div className={`space-y-3 md:space-y-4 ${standalone ? "max-w-4xl mx-auto" : ""}`}>
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className={`rounded-2xl md:rounded-3xl border overflow-hidden ${cardBg}`}
        >
          <button
            onClick={() => setActive(active === index ? null : index)}
            className={`w-full flex justify-between items-center px-5 md:px-6 py-4 md:py-5 text-left transition-colors ${active === index ? activeBg : ""}`}
          >
            <span className={`font-semibold text-sm md:text-base leading-relaxed pr-4 ${questionColor}`}>
              {faq.question}
            </span>
            <span className={`shrink-0 transition-transform duration-300 ${chevronColor} ${active === index ? "rotate-180" : ""}`}>
              <FaChevronDown />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {active === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className={`px-5 md:px-6 pb-5 text-sm md:text-base leading-relaxed ${answerColor}`}>
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );

  if (standalone) {
    return content;
  }

  return (
    <section id="faq" className={`section-padding ${bg}`}>
      <div className="page-container max-w-4xl">
        <div className="text-center mb-10 md:mb-14">
          <h2 className={`text-3xl md:text-4xl font-bold ${titleColor}`}>
            Frequently Asked <span className="text-emerald-500">Questions</span>
          </h2>
          <p className={`${subtitleColor} mt-3 text-sm md:text-base`}>
            Find answers to the most common questions about our loan products and services.
          </p>
        </div>

        {content}

        <div className="text-center mt-10 md:mt-12">
          <Link to="/faq" className="btn-outline px-8 py-3">
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
