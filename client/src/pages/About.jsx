import { motion } from "framer-motion";
import { FaEye, FaBullseye, FaHandshake, FaUserCheck } from "react-icons/fa";

function About() {
  const values = [
    {
      title: "Integrity",
      desc: "We build relationships based on honesty and ethical financial counseling, ensuring no hidden charges.",
      icon: <FaHandshake className="text-emerald-500 text-2xl" />,
    },
    {
      title: "Transparency",
      desc: "All loan calculations, interest schedules, and processing terms are explicitly disclosed to customers.",
      icon: <FaEye className="text-emerald-500 text-2xl" />,
    },
    {
      title: "Customer First",
      desc: "We tailor customized repayment structures and loan matching options prioritizing our customers' goals.",
      icon: <FaUserCheck className="text-emerald-500 text-2xl" />,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        
        {/* Intro Section */}
        <div className="grid lg:grid-cols-[1fr_0.90fr] gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              WHO WE ARE
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight">
              About <span className="text-emerald-600">Pin Money</span>
            </h1>
            <p className="text-slate-600 leading-relaxed text-base font-medium">
              Pin Money is a leading financial matchmaking and service platform dedicated to bridging the gap between individuals and top-tier banking partners in India. We simplify the entire lending ecosystem, offering a 100% digital, fast, and transparent process.
            </p>
            <p className="text-slate-500 leading-relaxed text-sm">
              Whether you are looking to purchase your dream home, scale your commercial business, check credit standing, or secure emergency funds through personal loans, our platform delivers customized choices with zero stress.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700" 
              alt="Pin Money Workspace" 
              className="rounded-4xl shadow-xl shadow-slate-900/5 border border-slate-100"
            />
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-4xl p-8 border border-slate-100 shadow-sm space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl">
              <FaBullseye />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Our Mission</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              To empower every Indian citizen with instant access to affordable finance, removing standard structural delays and promoting economic growth one loan at a time.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-4xl p-8 border border-slate-100 shadow-sm space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl">
              <FaEye />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Our Vision</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              To become India's most trusted, consumer-friendly digital credit consulting partner by leveraging tech, secure operations, and deep banking relations.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800">Our Core Values</h2>
            <p className="text-slate-400 text-sm mt-2">The operational pillars that define our daily services.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-slate-100 text-center flex flex-col items-center gap-4 hover:shadow-lg transition duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                  {v.icon}
                </div>
                <h4 className="font-bold text-slate-800 text-lg">{v.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;