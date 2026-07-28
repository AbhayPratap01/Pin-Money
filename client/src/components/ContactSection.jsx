import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

function ContactSection({ compact = false }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill all fields"); return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Query submitted! We'll contact you within 2 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setSubmitting(false);
    }, 1200);
  };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const inputCls = "rounded-2xl md:rounded-3xl border border-slate-700 bg-slate-800/60 px-5 py-3 outline-none focus:border-emerald-500 focus:bg-slate-800 transition w-full text-white placeholder-slate-500";

  const contacts = [
    { icon: <FaMapMarkerAlt />, title: "Office Address", text: "A-64, Office No. 2, Sector 4, Noida, UP 201301" },
    { icon: <FaPhoneAlt />, title: "Phone", text: "+91 87962 13194" },
    { icon: <FaEnvelope />, title: "Email", text: "support@pinmoney.in" },
    { icon: <FaClock />, title: "Working Hours", text: "Mon–Sat: 10:00 AM – 7:00 PM" },
  ];

  return (
    <section id="contact" className="section-padding bg-slate-950">
      <div className="page-container">
        <div className="page-header mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Contact <span className="text-emerald-400">Us</span></h2>
          <p className="text-slate-400 text-sm md:text-base">We're here to help. Reach out to our dedicated customer support team.</p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-slate-900/60 backdrop-blur-sm rounded-3xl md:rounded-4xl p-6 md:p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">Send Us A Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your Full Name" className={inputCls} />
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email Address" className={inputCls} />
                <input name="phone" value={form.phone} onChange={handleChange} type="text" placeholder="Phone Number" className={inputCls} />
              </div>
              <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="How can we help you?" className={`${inputCls} resize-none`} />
              <button type="submit" disabled={submitting}
                className="w-full btn-primary py-4 font-bold flex items-center justify-center gap-2 transition disabled:opacity-50">
                <FaPaperPlane />
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-4 md:space-y-5">
            {contacts.map(c => (
              <div key={c.title} className="bg-slate-900/60 border border-slate-800 rounded-2xl md:rounded-3xl p-5 md:p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-sm shrink-0">
                  {c.icon}
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 text-sm">{c.title}</h5>
                  <p className="text-xs md:text-sm text-slate-400 mt-1 leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {!compact && (
          <div className="text-center mt-10 md:mt-12">
            <Link to="/contact" className="btn-outline border-slate-600 bg-transparent text-white hover:bg-white hover:text-slate-900 px-8 py-3">
              Visit Full Contact Page
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default ContactSection;
