import { SHOW_CASES } from "@/data/showcase.data";
import React from "react";

const AuthShowcase = () => {
 return (
  <div className="hidden md:flex md:w-1/2 bg-primary items-center justify-center px-6 lg:px-16 py-12">
    <div className="max-w-xl w-full">
      <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-white">
        Welcome to {" "}
        <span className="font-archivo font-extrabold text-primary-900">
        Healthixia Care
        </span>
      </h2>

      {SHOW_CASES.map((showCase, index) => (
        <div
          key={index}
          className="bg-white/30 backdrop-blur-md rounded-xl shadow-md mb-8 p-6 border border-white/40"
        >
          <h2 className="font-bold text-2xl mb-2 text-white">
            {showCase.title}
          </h2>

          <p className="text-sm lg:text-base text-white/90 leading-relaxed">
            {showCase.about}
          </p>
        </div>
      ))}
    </div>
  </div>
);
};

export default AuthShowcase;


