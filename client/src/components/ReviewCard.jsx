import { FaStar } from "react-icons/fa";

function ReviewCard({ name, review, location }) {
  const initial = name ? name.charAt(0) : "C";
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex text-amber-400 text-xs">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          "{review}"
        </p>
      </div>

      <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-slate-50">
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 font-extrabold flex items-center justify-center text-sm border border-emerald-100">
          {initial}
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">{name}</h4>
          <p className="text-xs text-slate-400">{location || "Verified Customer"}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;