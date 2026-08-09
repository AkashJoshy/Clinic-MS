import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PUBLIC_NAV_LINKS } from "@/constants/navLinks.constant";
import { Link, useLocation } from "react-router-dom";

const PublicHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const isDoctorRegistration = location.pathname === "/doctor-registration";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 px-6 sm:px-12 h-16 sm:h-17 flex items-center justify-between transition-all duration-300 ${
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

        {!isDoctorRegistration && (
          <div className="hidden md:flex gap-9">
            {PUBLIC_NAV_LINKS.map((link) => (
              <span
                key={link}
                className="nav-link cursor-pointer"
                onClick={() => scrollTo(link.toLowerCase())}
              >
                {link}
              </span>
            ))}
          </div>
        )}

        <div className="hidden md:flex gap-2.5">
          <Link to={"/login"}>
            <Button size="lg" variant="main">
              Log In
            </Button>
          </Link>
          <Link to={"/signup"}>
            <Button
              size="lg"
              className="transition-transform duration-150 hover:-translate-y-0.5"
              variant="default"
            >
              Sign Up
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#1a1a2e] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1a1a2e] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1a1a2e] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`fixed top-16 left-0 right-0 z-99 md:hidden bg-[rgba(248,246,241,0.97)] backdrop-blur-md border-b border-[#e8e4da] flex flex-col px-6 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-72 py-6" : "max-h-0 py-0"
        }`}
      >
        {!isDoctorRegistration &&
          PUBLIC_NAV_LINKS.map((link) => (
            <span
              key={link}
              className="nav-link cursor-pointer py-3 text-base border-b border-[#e8e4da] last:border-none"
              onClick={() => scrollTo(link.toLowerCase())}
            >
              {link}
            </span>
          ))}

        <div className={`flex gap-2.5 ${isDoctorRegistration ? 'mt-0   ' : 'mt-5'}`}>
          <Link className="flex-1" to={"/login"}>
            <Button className="w-full" variant="main">
              Log In
            </Button>
          </Link>
          <Link className="flex-1" to={"/signup"}>
            <Button
              className="w-full transition-transform duration-150 hover:-translate-y-0.5"
              variant="default"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PublicHeader;
