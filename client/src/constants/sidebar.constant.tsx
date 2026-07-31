import type { NavItem } from "@/types/sideNav";
import {
  LayoutDashboard,
  Network,
  Stethoscope,
  CreditCard,
  Settings,
  LogOut,
  Users,
  Wallet,
  Landmark,
  BarChart3,
  FileText,
  CalendarClock,
  IndianRupee,
  Bell,
  CalendarCheck2,
  LucideUser,
  Receipt,
  CalendarDays,
  CalendarPlus,
  Search,
} from "lucide-react";
import { useAuthStore } from "@/store";
import { Navigate, replace, useNavigate } from "react-router-dom";

export const ADMIN_TOP_NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/admin/dashboard",
  },
  {
    label: "Doctors",
    icon: <Stethoscope size={20} />,
    path: "/admin/doctors",
  },
  {
    label: "Patients",
    icon: <Users size={20} />,
    path: "/admin/patients",
  },
  {
    label: "Departments",
    icon: <Network size={20} />,
    path: "/admin/departments",
  },
  {
    label: "Subscription Plans",
    icon: <CreditCard size={20} />,
    path: "/admin/subscriptions",
  },
  {
    label: "Payment Revenue",
    icon: <BarChart3 size={20} />,
    path: "/admin/revenue",
  },
  {
    label: "Wallet",
    icon: <Wallet size={20} />,
    path: "/admin/wallet",
  },
  {
    label: "Withdraw Requests",
    icon: <Landmark size={20} />,
    path: "/admin/withdraw-requests",
  },
  {
    label: "System Reports",
    icon: <FileText size={20} />,
    path: "/admin/reports",
  },
  {
    label: "Notifications",
    icon: <Bell size={20} />,
    path: "/admin/notifications",
  },
  {
    label: "My Profile",
    icon: <LucideUser size={20} />,
    path: "/admin/my-profile",
  },
];

export const DOCTOR_TOP_NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/doctor/dashboard",
  },
  {
    label: "Appointments",
    icon: <CalendarCheck2 size={20} />,
    path: "/doctor/appointments",
  },
  {
    label: "Schedule",
    icon: <CalendarClock size={20} />,
    path: "/doctor/schedule",
  },
  {
    label: "Patients",
    icon: <Users size={20} />,
    path: "/doctor/patients",
  },
  {
    label: "Subscription",
    icon: <CreditCard size={20} />,
    path: "/doctor/subscription",
  },
  {
    label: "Revenue",
    icon: <IndianRupee size={20} />,
    path: "/doctor/revenue",
  },
  {
    label: "Wallet",
    icon: <Wallet size={20} />,
    path: "/doctor/wallet",
  },
  {
    label: "Notifications",
    icon: <Bell size={20} />,
    path: "/doctor/notifications",
  },
  {
    label: "My Profile",
    icon: <LucideUser size={20} />,
    path: "/doctor/my-profile",
  },
];

export const PATIENT_TOP_NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/patient/dashboard",
  },
  {
    label: "Find Doctors",
    icon: <Search size={20} />,
    path: "/patient/find-doctors",
  },
  {
    label: "Book Appointment",
    icon: <CalendarPlus size={20} />,
    path: "/patient/book-appointment",
  },
  {
    label: "My Bookings",
    icon: <CalendarDays size={20} />,
    path: "/patient/my-appointments",
  },
  {
    label: "Medical Reports",
    icon: <FileText size={20} />,
    path: "/patient/medical-reports",
  },
  {
    label: "Bills & Payments",
    icon: <Receipt size={20} />,
    path: "/patient/bills-payments",
  },
  {
    label: "Wallet",
    icon: <Wallet size={20} />,
    path: "/patient/wallet",
  },
  {
    label: "Notifications",
    icon: <Bell size={20} />,
    path: "/patient/notifications",
  },
  {
    label: "My Profile",
    icon: <LucideUser size={20} />,
    path: "/patient/my-profile",
  },
];

export const PATIENT_BOTTOM_NAV_ITEMS: NavItem[] = [
  {
    label: "Settings",
    icon: <Settings size={20} />,
    path: "/patient/settings",
  },
  {
    label: "Logout",
    icon: <LogOut size={20} />,
  },
];

export const DOCTOR_BOTTOM_NAV_ITEMS: NavItem[] = [
  {
    label: "Settings",
    icon: <Settings size={20} />,
    path: "/doctor/settings",
  },
  {
    label: "Logout",
    icon: <LogOut size={20} />,
    path: "/",
    onClick: () => {
      return {
        logout: "doctor",
        path: "/doctor",
      };
    },
  },
];

export const ADMIN_BOTTOM_NAV_ITEMS: NavItem[] = [
  {
    label: "Settings",
    icon: <Settings size={20} />,
    path: "/admin/settings",
  },
  {
    label: "Logout",
    icon: <LogOut size={20} />,
    path: "/",
    onClick: () => {
      return {
        logout: "admin",
        path: "/admin",
      };
    },
  },
];
