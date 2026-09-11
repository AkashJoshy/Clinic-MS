import React from "react";
import { WHY_US } from "@/data/home.data";


const AboutUs = ({websiteName}: {websiteName: string }) => {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-25 px-12 bg-linear-to-br from-[#1a1a2e] to-[#16213e] text-white"
    >
      <div className="absolute -top-25 -right-25 w-100 h-100 rounded-full bg-[radial-gradient(circle,rgba(45,106,79,0.2)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-275 mx-auto">
        <p className="text-[#5fba8a] uppercase tracking-widest text-sm mb-3">
          Why Choose Us
        </p>

        <h2 className="font-serif text-[40px] font-bold mb-3 tracking-[-0.02em]">
          Why Clinics Choose {websiteName}
        </h2>

        <p className="text-[hsl(220,21%,73%)] text-base max-w-130 leading-relaxed mb-14">
          We built {websiteName} with one mission: make running a clinic easier, so
          doctors can focus on patients — not paperwork.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WHY_US.map((w) => (
            <div
              key={w.title}
              className="flex gap-4 items-start p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
            >
              <div className="text-[28px] shrink-0">{w.icon}</div>

              <div>
                <h3 className="font-serif text-lg font-bold mb-1 text-white">
                  {w.title}
                </h3>

                <p className="text-sm text-[#aab4c8] leading-relaxed">
                  {w.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;