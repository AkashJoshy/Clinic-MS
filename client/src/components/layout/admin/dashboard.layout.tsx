import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/store";
import { DashboardHeader } from "@/components/shared/doctor/dashboard-header.shared";
import AdminSideNav from "./sidebar/admin-side-nav.layout.";

const AdminDashboardLayout: React.FC = () => {
  const { admin } = useAuthStore((state) => state.users);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DashboardHeader role={"admin"} />
      <div className="flex-1 bg-[#080d14] flex overflow-hidden">
        <AdminSideNav />
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

export default AdminDashboardLayout;
