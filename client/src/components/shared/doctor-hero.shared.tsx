import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Stethoscope, LogIn } from "lucide-react";

const DoctorHero = ({ websiteName }: { websiteName: string }) => {
  return (
    <section className="relative flex min-h-screen flex-col items-center gap-12 px-5 pb-16 pt-24 sm:px-8 sm:pt-28 lg:flex-row lg:items-center lg:gap-16 lg:px-12 lg:pb-20">

      <div className="order-2 flex w-full max-w-2xl flex-col items-center text-center lg:order-1 lg:flex-[0_0_55%] lg:items-start lg:text-left">
        <p className="fade-up fade-up-1 mb-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          For Medical Professionals
        </p>

        <h1 className="fade-up fade-up-2 mb-6 text-[clamp(34px,8vw,64px)] font-black leading-[1.12] tracking-[-0.03em] text-[#1a1a2e] font-playfair sm:mb-7">
          Empower Your Practice.
          <br />
          <span className="text-primary">Streamline Care.</span>
          <br />
          Join <span className="text-primary">{websiteName}.</span>
        </h1>

        {/* Buttons */}
        <div className="fade-up fade-up-3 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
          <Link to="/doctor" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="main"
              className="group w-full gap-2 transition-all duration-200 hover:-translate-y-0.5 sm:w-auto"
            >
              <LogIn className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              Doctor Portal Login
            </Button>
          </Link>

          <Link to="/doctor-registration" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="group w-full gap-2 border-primary/40 bg-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 sm:w-auto"
            >
              <Stethoscope className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              Register Doctor
            </Button>
          </Link>
        </div>

        <p className="fade-up fade-up-4 mt-6 text-[12px] tracking-[0.02em] text-[#888] sm:mt-7 sm:text-[13px]">
          Trusted by hundreds of leading specialists and clinics.
        </p>
      </div>

      <div className="fade-up fade-up-3 order-1 w-full lg:order-2 lg:flex-1">
        <div className="rounded-[18px] border border-[#e0dbd0] bg-white/70 p-6 shadow-[0_20px_60px_rgba(45,106,79,0.1)] backdrop-blur-[8px] sm:p-8 lg:p-9">
          <p className="mb-5 text-sm leading-6 text-[#444] sm:text-base sm:leading-7">
            Welcome to the dedicated portal for healthcare providers. Manage
            your appointments, patient records, prescriptions, and billing all
            from one secure dashboard.
          </p>

          <p className="text-sm leading-6 text-[#444] sm:text-base sm:leading-7">
            Enhance your clinical efficiency and spend more time focusing on
            what matters most — your patients.
          </p>

          <div className="mt-6 flex flex-wrap gap-6 sm:mt-7 sm:gap-7">
            {[
              ["100+", "Clinics Active"],
              ["Zero", "Paperwork"],
              ["24/7", "Support"],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="text-[24px] font-bold text-primary sm:text-[26px]">
                  {val}
                </div>

                <div className="mt-0.5 text-xs text-[#888]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default DoctorHero;