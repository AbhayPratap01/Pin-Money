import { FaHome, FaMoneyCheckAlt, FaBuilding, FaBriefcase, FaCalculator, FaChartLine } from "react-icons/fa";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Personal Loan",
    subtitle: "Quick, unsecured loans up to ₹40 Lakhs for any personal need — medical, travel, or wedding.",
    icon: <FaMoneyCheckAlt />,
    to: "/products",
  },
  {
    title: "Home Loan",
    subtitle: "Achieve your homeownership dream with long-tenure loans up to ₹10 Crores at competitive rates.",
    icon: <FaHome />,
    to: "/products",
  },
  {
    title: "Business Loan",
    subtitle: "Scale your enterprise with collateral-free business loans up to ₹5 Crores.",
    icon: <FaBriefcase />,
    to: "/products",
  },
  {
    title: "Loan Against Property",
    subtitle: "Unlock property equity with multi-purpose secured loans at the lowest interest rates.",
    icon: <FaBuilding />,
    to: "/products",
  },
  {
    title: "CIBIL Score Check",
    subtitle: "Check your CIBIL credit score for free in under 60 seconds without impacting your rating.",
    icon: <FaChartLine />,
    to: "/cibil-score",
  },
  {
    title: "EMI Calculator",
    subtitle: "Plan your monthly budget with our interactive EMI calculator — no registration required.",
    icon: <FaCalculator />,
    to: "/emi-calculator",
  },
];

function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            Our <span className="text-emerald-600">Services</span>
          </h2>
          <p className="text-slate-500 mt-3 text-sm">
            End-to-end loan solutions and financial tools to make borrowing simple and smart.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;