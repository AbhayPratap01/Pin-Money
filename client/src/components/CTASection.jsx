import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="section-padding bg-linear-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="page-container text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Ready To Get Your Dream Loan?
        </h2>

        <p className="mt-5 md:mt-6 text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Apply today and receive expert guidance with the best loan offers tailored to your needs.
        </p>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
          <Link to="/loan-application" className="btn-primary px-8 py-4 text-base">
            Apply Now
          </Link>

          <Link to="/contact" className="btn-outline border-white/30 bg-transparent text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-base">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
