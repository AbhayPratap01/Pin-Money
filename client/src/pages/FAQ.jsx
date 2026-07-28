import { Link } from "react-router-dom";
import FAQSection from "../components/FAQSection";

function FAQ() {
  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        <div className="page-header">
          <span className="inline-block text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
            Help Center
          </span>
          <h1 className="page-title">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h1>
          <p className="page-subtitle">
            Find clear answers about eligibility, documents, interest rates, and loan processing at Pin Money.
          </p>
        </div>

        <FAQSection standalone />

        <div className="text-center pt-4 md:pt-8">
          <p className="text-slate-500 text-sm mb-4">Still have questions? Our support team is ready to help.</p>
          <Link to="/contact" className="btn-primary px-8 py-3.5">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
