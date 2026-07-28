import { motion } from "framer-motion";
import { FaStar, FaGoogle, FaFacebookF, FaAward } from "react-icons/fa";

function Reviews() {
  const platforms = [
    { name: "Google Reviews", rating: "4.9/5", count: "1,200+ reviews", icon: <FaGoogle className="text-red-500" /> },
    { name: "Facebook Rating", rating: "4.8/5", count: "800+ votes", icon: <FaFacebookF className="text-blue-600" /> },
    { name: "Trustpilot Score", rating: "4.9/5", count: "500+ reviews", icon: <FaAward className="text-emerald-500" /> },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      location: "Delhi",
      rating: 5,
      text: "Got my personal loan approved in 24 hours. The documentation was fully digital, and the executives guided me through every single step. Highly recommended for fast approvals!",
      avatar: "R",
    },
    {
      name: "Neha Gupta",
      location: "Noida",
      rating: 5,
      text: "Very professional staff and excellent interest rates. We transferred our home loan balance to their partner bank, and it saved us close to 1.5% in interest rate payout.",
      avatar: "N",
    },
    {
      name: "Amit Verma",
      location: "Ghaziabad",
      rating: 5,
      text: "Best loan matchmaking experience I've ever had. Thank you Pin Money! Checked my free CIBIL score first and submitted the business loan details; got pre-approvals in minutes.",
      avatar: "A",
    },
    {
      name: "Sanjay Singhal",
      location: "Gurugram",
      rating: 5,
      text: "Securing capital for our startup was hassle-free. The flexible repayment terms proposed by their advisory team helped us manage our cash flow smoothly.",
      avatar: "S",
    },
    {
      name: "Pooja Mehta",
      location: "Faridabad",
      rating: 5,
      text: "Excellent service! Approved for home loan with very minimal paperwork. The digital dashboard tracks my EMI schedule accurately. Super happy!",
      avatar: "P",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header & Stats Summary */}
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center bg-white rounded-4xl p-8 border border-slate-100 shadow-xl shadow-slate-900/5">
          <div className="text-center lg:text-left space-y-4">
            <h1 className="text-4xl font-extrabold text-slate-800">What Customers Say</h1>
            <p className="text-slate-500 text-sm">Real reviews from verified borrowers across various states in India.</p>
            <div className="flex items-center justify-center lg:justify-start gap-3 mt-4">
              <span className="text-5xl font-black text-slate-800">4.9</span>
              <div>
                <div className="flex text-amber-400 text-base">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <p className="text-xs text-slate-400 font-bold mt-1">Based on 2,500+ ratings</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {platforms.map((p) => (
              <div key={p.name} className="border border-slate-100 p-5 rounded-3xl bg-slate-50/50 flex flex-col justify-between items-center text-center space-y-2">
                <div className="text-2xl">{p.icon}</div>
                <div>
                  <p className="font-extrabold text-base text-slate-800">{p.rating}</p>
                  <p className="text-xs font-semibold text-slate-500">{p.name}</p>
                </div>
                <p className="text-xxs text-slate-400">{p.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-lg transition duration-300"
            >
              <div className="space-y-4">
                <div className="flex text-amber-400 text-xs">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-50">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 font-extrabold flex items-center justify-center text-sm border border-emerald-100">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Reviews;