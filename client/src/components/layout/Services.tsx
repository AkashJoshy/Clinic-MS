import React from "react";
import { SERVICES } from "@/data/home.data";

const ServiceCard = ({ s }: { s: (typeof SERVICES)[0] }) => (
  <div className="rounded-[14px] px-6 py-7 border border-[#e8e4da] flex-1 transition-all duration-200 hover:-translate-y-1.5">
    <div className="text-[32px] mb-3.5">{s.icon}</div>
    <h3 className="font-playfair font-bold text-[18px] text-[#1a1a2e] mb-2.5">
      {s.title}
    </h3>
    <p className="font-sans text-[14px] text-[#666] leading-[1.7]">{s.desc}</p>
  </div>
);

const Services = () => {
  return (
    <section className="px-12 py-25 bg-white" id="services">
      <p className="text-center">What We Offer</p>
      <h2 className="font-playfair font-bold text-[40px] text-[#1a1a2e] tracking-[-0.02em] text-center mb-2">
        Our Services
      </h2>
      <p className="font-sans text-center text-[#666] text-[16px] max-w-120 mx-auto mb-14">
        Everything your clinic needs, thoughtfully designed into one seamless
        experience.
      </p>

      {/* Row 1 */}
      <div className="flex flex-wrap gap-5 max-w-275 mx-auto mb-5">
        {SERVICES.slice(0, 3).map((s) => (
          <ServiceCard key={s.title} s={s} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap gap-5 max-w-275 mx-auto">
        {SERVICES.slice(3).map((s) => (
          <ServiceCard key={s.title} s={s} />
        ))}
      </div>
    </section>
  );
};

export default Services;
