import { Button } from "../ui/button";

const PublicFooter = ({websiteName}: {websiteName: string }) => {

  return (
    <div>
      <section className="bg-primary py-17.5 px-12 text-center">
        <h2 className="font-playfair font-bold text-[36px] text-white mb-3.5 tracking-[-0.02em]">
          Ready to Transform Your Clinic?
        </h2>
        <p className="font-sans text-white/80 text-[16px] mb-8">
          Join thousands of clinics already using {websiteName} to deliver
          better care.
        </p>
        <div className="flex gap-3.5 justify-center">
          <Button variant={"larger"}>Start Free Trial</Button>
          <Button className="transition-transform duration-150 hover:-translate-y-0.5" variant={"outline"}>Learn More</Button>
        </div>
      </section>

      <footer className="bg-[#111827] py-6 px-12 flex items-center justify-between">
        <span className="font-playfair font-bold text-[12px] md:text-[16px] text-white">
          {websiteName}
        </span>
        <span className="font-sans text-[12px] md:text-[16px] text-[#6b7280]">
          © 2025 {websiteName}. All rights reserved.
        </span>
      </footer>
    </div>
  );
};

export default PublicFooter;
