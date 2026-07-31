import React from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  CalendarCheck,
  Activity,
} from "lucide-react";

const StatCard: React.FC<{
  title: string;
  value: string;
  delta: string;
  positive?: boolean;
}> = ({ title, value, delta, positive = true }) => (
  <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-5 hover:border-[#1dc465]/30 transition-colors duration-200">
    <p className="text-[#8b9ab0] text-xs font-medium uppercase tracking-widest mb-3">
      {title}
    </p>
    <p className="text-white text-2xl font-bold mb-1">{value}</p>
    <p className={`text-xs font-medium ${positive ? "text-[#1dc465]" : "text-rose-400"}`}>
      {positive ? "▲" : "▼"} {delta} this month
    </p>
  </div>
);

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 space-y-8">

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1dc465]/15 border border-[#1dc465]/25 flex items-center justify-center">
          <LayoutDashboard size={20} className="text-[#1dc465]" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold">Dashboard</h1>
          <p className="text-[#8b9ab0] text-sm">Welcome back, Admin 👋</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Clinics"   value="142"   delta="+12 clinics" />
        <StatCard title="Active Doctors"  value="538"   delta="+34 doctors" />
        <StatCard title="Subscriptions"   value="891"   delta="+67 plans" />
        <StatCard title="Appointments"    value="3,204" delta="-5%" positive={false} />
      </div>

      <div className="bg-[#0d1a27] border border-white/8 rounded-2xl p-6">
        
      </div>
    </div>
  );
};

export default AdminDashboardPage;
