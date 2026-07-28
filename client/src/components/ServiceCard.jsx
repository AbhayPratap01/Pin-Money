import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function ServiceCard({ icon, title, subtitle, to = "/products" }) {
  return (
    <div className="group bg-white border border-slate-100 rounded-3xl p-6 md:p-7 flex flex-col gap-5 hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300">
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition duration-300">
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition">{title}</h3>
        <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{subtitle}</p>
      </div>

      <Link
        to={to}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-800 transition"
      >
        Learn More <FaArrowRight className="text-[10px]" />
      </Link>
    </div>
  );
}

export default ServiceCard;