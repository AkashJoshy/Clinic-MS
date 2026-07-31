import type { NotFoundProps } from "@/types/admin";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC<NotFoundProps> = ({
    name,
    description,
    toNavigate
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <h2 className="text-2xl font-bold text-white">{name} not found</h2>

      <p className="text-[#8b9ab0] mt-2">
        {description}
      </p>

      <button
        onClick={() => navigate(toNavigate)}
        className="mt-6 px-4 py-2 rounded-xl cursor-pointer bg-[#1dc465] text-white"
      >
        Back to {name}
      </button>
    </div>
  );
};

export default NotFound;