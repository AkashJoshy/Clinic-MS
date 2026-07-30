import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = ({websiteName}: {websiteName: string }) => {
  return (
    <div>
      <section className="min-h-screen pt-24 sm:pt-30 px-6 sm:px-12 pb-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-15 relative">
        <div />
        <div className="absolute bottom-15 left-[40%] w-50 h-50 rounded-full pointer-events-none" />

        <div className="w-full lg:flex-[0_0_55%] lg:max-w-145 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <p className="text-primary fade-up fade-up-1 uppercase tracking-[0.15em] font-semibold text-xs mb-3.5">
            Healthcare Management Platform
          </p>
          <h1 className="font-playfair fade-up fade-up-2 text-[clamp(38px,5vw,64px)] font-black leading-[1.12] tracking-[-0.03em] text-[#1a1a2e] mb-7">
            Smart Scheduling.
            <br />
            <span className="text-primary">Better Care.</span>
            <br />
            Connected <span className="text-primary">Clinics.</span>
          </h1>
          <div className="fade-up fade-up-3 flex gap-3.5 flex-wrap justify-center lg:justify-start">
            <Link to={"/doctor-registration"}>
              <Button
                size={"lg"}
                className="transition-transform duration-150 hover:-translate-y-0.5"
                variant="default"
              >
                Start Free Trial
              </Button>
            </Link>

            <Link to={"/signup"}>
              <Button size={"lg"} variant="main">
                Sign Up
              </Button>
            </Link>
          </div>
          <p className="fade-up fade-up-4 mt-7 text-[13px] text-[#888] tracking-[0.02em]">
            No credit card required · Free 14-day trial · Cancel anytime
          </p>
        </div>

        <div className="fade-up fade-up-3 w-full lg:flex-1 order-1 lg:order-2">
          <div className="bg-white/70 border border-[#e0dbd0] rounded-[18px] p-9 sm:p-[36px_32px] backdrop-blur-[8px] shadow-[0_20px_60px_rgba(45,106,79,0.1)]">
            <p className="text-base leading-7 text-[#444] mb-6">
              {websiteName} brings your entire clinic workflow into one
              intelligent platform — from the moment a patient books an
              appointment to follow-up care and billing.
            </p>
            <p className="text-base leading-7 text-[#444]">
              Designed for modern clinics, it eliminates paperwork, reduces
              no-shows, and helps your team focus on what truly matters —
              delivering exceptional patient care.
            </p>
            <div className="mt-7 flex gap-7 flex-wrap">
              {[
                ["10k+", "Patients Managed"],
                ["99.9%", "Uptime"],
                ["4.9★", "Avg Rating"],
              ].map(([val, label]) => (
                <div key={label}>
                  <div className="text-primary text-[26px] font-bold">
                    {val}
                  </div>
                  <div className="text-xs text-[#888] mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
