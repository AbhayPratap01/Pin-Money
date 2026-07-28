import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400">
      <div className="page-container py-14 md:py-16 lg:py-20">
        <div className="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Tagline */}
          <div className="space-y-5 md:space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white font-black shadow-lg shadow-emerald-600/20 text-sm">
                PM
              </div>
              <span className="text-white text-base font-bold tracking-wide">PIN MONEY</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500">
              Loans Made Simple.<br />Dreams Made Possible.
            </p>
            <div className="flex items-center gap-3.5 text-base text-slate-500">
              <a href="#" className="hover:text-emerald-400 transition" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="hover:text-emerald-400 transition" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="hover:text-emerald-400 transition" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className="hover:text-emerald-400 transition" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-3 text-sm">
              <Link to="/" className="block hover:text-white transition">Home</Link>
              <Link to="/products" className="block hover:text-white transition">Loans</Link>
              <Link to="/cibil-score" className="block hover:text-white transition">CIBIL Score</Link>
              <Link to="/emi-calculator" className="block hover:text-white transition">EMI Calculator</Link>
              <Link to="/reviews" className="block hover:text-white transition">Reviews</Link>
              <Link to="/about" className="block hover:text-white transition">About Us</Link>
            </div>
          </div>

          {/* Support Links */}
          <div className="space-y-4 md:space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support</h4>
            <div className="space-y-3 text-sm">
              <Link to="/faq" className="block hover:text-white transition">FAQs</Link>
              <Link to="/contact" className="block hover:text-white transition">Contact Us</Link>
              <a href="#" className="block hover:text-white transition">Privacy Policy</a>
              <a href="#" className="block hover:text-white transition">Terms & Conditions</a>
              <a href="#" className="block hover:text-white transition">Disclaimer</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 md:space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                <span className="font-bold text-slate-300 block mb-1">Address</span>
                A-64, Office No. 2, Ground Floor,<br />Sector 4, Noida, Uttar Pradesh 201301
              </p>
              <p>
                <span className="font-bold text-slate-300 block mb-1">Phone</span>
                +91 87962 13194
              </p>
              <p>
                <span className="font-bold text-slate-300 block mb-1">Email</span>
                support@pinmoney.in
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 border-t border-slate-900 pt-6 md:pt-8 text-center text-xs text-slate-600">
          © 2026 Pin Money Consulting Pvt. Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
