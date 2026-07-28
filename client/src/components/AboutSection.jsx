import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaHandshake, FaUserCheck, FaShieldAlt } from "react-icons/fa";

const values = [
  { icon: <FaHandshake />, title: "Integrity", desc: "Transparent terms with zero hidden charges." },
  { icon: <FaEye />, title: "Transparency", desc: "Clear loan schedules and explicit processing disclosures." },
  { icon: <FaUserCheck />, title: "Customer First", desc: "Tailored repayment structures for every borrower." },
  { icon: <FaShieldAlt />, title: "Security", desc: "Bank-grade SSL encryption protecting your data." },
];

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700"
              alt="About Pin Money"
              className="rounded-4xl shadow-xl shadow-slate-900/5 border border-slate-100 w-full"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-block text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              Who We Are
            </span>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">
              About <span className="text-emerald-600">Pin Money</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Pin Money is India's trusted digital financial consultant, bridging individuals and top banking partners. 
              We simplify lending with a 100% digital, fast, and transparent process — from CIBIL check to loan disbursal.
            </p>

            {/* Mission & Vision */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-3xl p-5 space-y-2">
                <div className="text-emerald-500 text-xl"><FaBullseye /></div>
                <h4 className="font-bold text-slate-800 text-sm">Our Mission</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Empower every Indian with instant access to affordable finance.</p>
              </div>
              <div className="bg-slate-50 rounded-3xl p-5 space-y-2">
                <div className="text-emerald-500 text-xl"><FaEye /></div>
                <h4 className="font-bold text-slate-800 text-sm">Our Vision</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Become India's most trusted digital credit consulting partner.</p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {values.map(v => (
                <div key={v.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                    {v.icon}
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 text-sm">{v.title}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-2 btn-dark py-3.5 text-sm"
            >
              Learn More About Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;