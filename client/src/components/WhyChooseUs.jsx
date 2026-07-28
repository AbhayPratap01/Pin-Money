import { motion } from "framer-motion";
import { FaBolt, FaPercent, FaShieldAlt, FaUniversity, FaLaptop, FaUserTie } from "react-icons/fa";

const features = [
  { title: "Fast Approval", desc: "Get loan eligibility checked & approved within 24 hours digitally.", icon: <FaBolt />, color: "text-amber-500 bg-amber-50" },
  { title: "Lowest Interest Rates", desc: "Competitive rates starting at just 10.5% p.a. across all loan types.", icon: <FaPercent />, color: "text-emerald-600 bg-emerald-50" },
  { title: "Secure Process", desc: "Bank-grade SSL encryption and RBI-compliant data protection standards.", icon: <FaShieldAlt />, color: "text-sky-500 bg-sky-50" },
  { title: "RBI Guideline Based", desc: "All products are fully compliant with Reserve Bank of India regulations.", icon: <FaUniversity />, color: "text-violet-500 bg-violet-50" },
  { title: "100% Digital Process", desc: "From application to disbursal — completely paperless and online.", icon: <FaLaptop />, color: "text-rose-500 bg-rose-50" },
  { title: "Trusted Advisors", desc: "Dedicated relationship managers with 10+ years of financial expertise.", icon: <FaUserTie />, color: "text-orange-500 bg-orange-50" },
];

function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose <span className="text-emerald-600">Pin Money?</span>
          </h2>
          <p className="text-slate-500 mt-3 text-sm">
            We deliver a seamless, secure, and customer-first lending experience across India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white border border-slate-100 rounded-3xl p-6 flex gap-5 items-start hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 ${item.color} group-hover:scale-110 transition duration-300`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;