import { motion } from "framer-motion";
import { FaUsers, FaUniversity, FaMoneyCheckAlt, FaStar } from "react-icons/fa";

const stats = [
  { icon: <FaUsers />, value: "50,000+", label: "Happy Customers", color: "text-emerald-500" },
  { icon: <FaUniversity />, value: "30+", label: "Bank Partners", color: "text-sky-500" },
  { icon: <FaMoneyCheckAlt />, value: "₹500 Cr+", label: "Loans Disbursed", color: "text-violet-500" },
  { icon: <FaStar />, value: "4.9 / 5", label: "Customer Rating", color: "text-amber-500" },
];

function Stats() {
  return (
    <section className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900 border border-slate-800 rounded-4xl p-6 text-center hover:border-emerald-800/50 transition-all hover:-translate-y-1 duration-300"
            >
              <div className={`text-3xl flex justify-center mb-3 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white">{item.value}</h3>
              <p className="mt-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;