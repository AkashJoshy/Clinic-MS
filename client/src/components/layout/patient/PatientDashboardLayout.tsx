import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PatientSideNav from "./PatientSideNav";
import { Header } from "../../shared/patient/Header";
import { usePatientProfiles } from "@/hooks/usePatientProfiles";

const PatientDashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  usePatientProfiles();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="flex flex-1 min-h-0">
        <div className="relative h-full transition-transform duration-300 ease-in-out">
          <PatientSideNav collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

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

export default PatientDashboardLayout;
