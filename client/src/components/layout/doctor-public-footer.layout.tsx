import { Button } from "../ui/button";

const DoctorPublicFooter = ({ websiteName }: { websiteName: string }) => {
  return (
    <div>
      <section className="bg-primary py-17.5 px-12 text-center">
        <h2 className="font-playfair font-bold text-[36px] text-white mb-3.5 tracking-[-0.02em]">
          Ready to Modernize Your Practice?
        </h2>
        <p className="font-sans text-white/80 text-[16px] mb-8">
          Join leading healthcare professionals who rely on {websiteName} daily.
        </p>
        <div className="flex gap-3.5 justify-center">
          <Button variant="larger">Join Now</Button>
          <Button
            className="transition-transform duration-150 hover:-translate-y-0.5"
            variant="outline"
          >
            Contact Sales
          </Button>
        </div>
      </section>

      <footer className="bg-[#111827] py-6 px-12 flex items-center justify-between">
        <span className="font-playfair font-bold text-[12px] md:text-[16px] text-white">
          {websiteName} for Doctors
        </span>
        <span className="font-sans text-[12px] md:text-[16px] text-[#6b7280]">
          © 2026 {websiteName}. All rights reserved.
        </span>
      </footer>
    </div>
  );
};

export default DoctorPublicFooter;
