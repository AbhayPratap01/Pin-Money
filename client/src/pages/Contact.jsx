import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill out all fields");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      toast.success("Query submitted! Our relationship managers will contact you within 2 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setSubmitting(false);
    }, 1200);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-800">Contact Us</h1>
          <p className="text-slate-500 mt-3 text-sm">We are here to help you get the best lending assistance. Reach out to our customer care team.</p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">
          {/* Query Form */}
          <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-xl shadow-slate-900/5 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6">Send Us A Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                  Your Full Name
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter full name"
                    className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-emerald-500 focus:bg-white transition"
                  />
                </label>
                
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                    Email Address
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter email"
                      className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-emerald-500 focus:bg-white transition"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                    Phone Number
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter mobile"
                      className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-emerald-500 focus:bg-white transition"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                  Message / Requirements
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe your loan query or feedback details..."
                    className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-emerald-500 focus:bg-white transition resize-none"
                  />
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-4 font-bold flex items-center justify-center gap-2 transition disabled:opacity-50 mt-4"
                >
                  <FaPaperPlane />
                  {submitting ? "Sending Query..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Details & Map */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* Info Cards */}
            <div className="bg-white border border-slate-100 rounded-4xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-800">Support Directory</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-sm flex-shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700 text-sm">Office Address</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Pin Money Consulting Pvt Ltd,<br />
                      A-64, Office No. 2, Ground Floor,<br />
                      Sector 4, Noida, Uttar Pradesh 201301
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-sm flex-shrink-0">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700 text-sm">Contact Number</h5>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">+91 87962 13194</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-sm flex-shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700 text-sm">Email Address</h5>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">support@pinmoney.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-sm flex-shrink-0">
                    <FaClock />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-700 text-sm">Working Hours</h5>
                    <p className="text-xs text-slate-500 mt-1">Mon - Sat: 10:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="rounded-4xl border border-slate-100 shadow-sm overflow-hidden h-60 bg-white relative">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4939768656667!2d77.3197607762694!3d28.584950375691147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f35d21a97%3A0xe54dcf9a1bcff3ab!2sSector%204%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;