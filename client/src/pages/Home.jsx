import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Stats from "../components/Stats";
import AboutSection from "../components/AboutSection";
import Testimonials from "../components/Testimonials";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import CTASection from "../components/CTASection";

function Home() {
  return (
    <>
      {/* 1. Hero Banner */}
      <Hero />

      <main>
        {/* 2. Our Services — six loan & tool cards */}
        <Services />

        {/* 3. Why Choose Us — six feature badges */}
        <WhyChooseUs />

        {/* 4. Stats — 50K+ customers, 30+ banks, etc. */}
        <Stats />

        {/* 5. About Pin Money */}
        <AboutSection />

        {/* 6. Customer Testimonials */}
        <Testimonials />

        {/* 7. FAQ Accordion — dark theme */}
        <FAQSection dark />

        {/* 8. Contact Section — dark theme */}
        <ContactSection />

        {/* 9. CTA Banner */}
        <CTASection />
      </main>
    </>
  );
}

export default Home;
