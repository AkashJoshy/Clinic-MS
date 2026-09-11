import React from "react";
import { Outlet } from "react-router-dom";
import DoctorSideNav from "./sidebar/side-nav.layout";
import { DashboardHeader } from "../../shared/doctor/dashboard-header.shared";
import { useDoctorProfile } from "@/hooks/use-doctor-profile.hook";

const DoctorDashboardLayout: React.FC = () => {
  useDoctorProfile();
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DashboardHeader role={"doctor"} />
      <div className="flex-1 bg-[#080d14] flex overflow-hidden">
        <DoctorSideNav />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="container mx-auto p-2 h-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;
