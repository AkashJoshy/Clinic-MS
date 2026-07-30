import React from "react";
import { FEATURES } from "@/data/home.data";

const Features = () => {
  return (
    <section id="features" className="py-25 px-12 bg-[#f8f6f1]">
      <div className="max-w-275 mx-auto">
        <p className="section-label">Platform Features</p>
        <h2 className="font-playfair font-bold text-[40px] text-[#1a1a2e] mb-2 tracking-[-0.02em]">
          Built for the Way
          <br />
          Clinics Actually Work
        </h2>
        <div className="w-12 h-0.75 bg-[#2d6a4f] rounded-sm my-4 mb-8" />

        <div className="grid md:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-[14px] px-7 py-8 border border-[#e8e4da] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,106,79,0.1)]"
            >
              <span className="inline-block bg-[#e8f4ee] text-[#2d6a4f] text-[11px] font-semibold tracking-[0.06em] uppercase px-2.5 py-0.75 rounded-full mb-2.5">
                {f.badge}
              </span>
              <h3 className="font-playfair font-bold text-[20px] text-[#1a1a2e] mb-3">
                {f.title}
              </h3>
              <p className="font-sans text-[14px] text-[#666] leading-[1.75]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
