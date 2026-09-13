import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const DoctorPublicHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] px-6 sm:px-12 h-16 sm:h-17 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(248,246,241,0.95)] backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8.5 h-8.5 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-lg">✦</span>
          </div>

          <span className="font-playfair font-bold text-[18px] sm:text-[20px] text-[#1DC465] tracking-[-0.02em]">
            Healthixia Care
          </span>
        </div>

        <div className="hidden lg:flex items-center xsxs:gap-4 md:gap-1 lg:gap-10">
          <Link
            to="/doctor"
            className="nav-link cursor-pointer text-sm text-[#1a1a2e] font-medium transition-colors hover:text-primary"
          >
            For Doctors
          </Link>

          <a
            href="#features"
            className="nav-link cursor-pointer text-sm text-[#1a1a2e] font-medium transition-colors hover:text-primary"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="nav-link cursor-pointer text-sm text-[#1a1a2e] font-medium transition-colors hover:text-primary"
          >
            Pricing
          </a>
        </div>

        <div className="hidden lg:flex gap-2.5">
          <Link to="/doctor">
            <Button size="lg" variant="main">
              Doctor Login
            </Button>
          </Link>

          <Link to="/doctor-registration">
            <Button
              size="lg"
              className="transition-transform duration-150 hover:-translate-y-0.5"
              variant="default"
            >
              Register as a Doctor
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-[#1a1a2e] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />

          <span
            className={`block w-6 h-0.5 bg-[#1a1a2e] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />

          <span
            className={`block w-6 h-0.5 bg-[#1a1a2e] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed top-16 left-0 right-0 z-[99] lg:hidden bg-[rgba(248,246,241,0.97)] backdrop-blur-md border-b border-[#e8e4da] flex flex-col px-6 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[400px] py-6" : "max-h-0 py-0"
        }`}
      >
        <Link
          to="/doctor"
          onClick={closeMenu}
          className="nav-link cursor-pointer py-3 text-sm border-b border-[#e8e4da] text-[#1a1a2e]"
        >
          For Doctors
        </Link>

        <a
          href="#features"
          onClick={closeMenu}
          className="nav-link cursor-pointer py-3 text-sm border-b border-[#e8e4da] text-[#1a1a2e]"
        >
          Features
        </a>

        <a
          href="#pricing"
          onClick={closeMenu}
          className="nav-link cursor-pointer py-3 text-sm border-b border-[#e8e4da] text-[#1a1a2e]"
        >
          Pricing
        </a>

        <div className="flex gap-2.5 mt-5">
          <Link className="w-full" to="/doctor" onClick={closeMenu}>
            <Button className="w-full" variant="main">
              Doctor Login
            </Button>
          </Link>

          <Link
            className="w-full"
            to="/doctor-registration"
            onClick={closeMenu}
          >
            <Button
              className="w-full transition-transform duration-150 hover:-translate-y-0.5"
              variant="default"
            >
              Register Doctor
            </Button>
          </Link>
        </div>
        
      </div>
      
    </>
  );
};

export default DoctorPublicHeader;
