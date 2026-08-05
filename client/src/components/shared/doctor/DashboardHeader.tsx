import { useAuthStore } from "@/store";
import { Activity, User } from "lucide-react";


export function DashboardHeader() {

  const user = useAuthStore(state => state.user)

  return (
    <div className="sticky top-0 z-100 flex items-center justify-between border-b border-white/8 bg-primary p-3.5 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.6)]">

      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10">
          <Activity size={18} className="text-white" />
        </div>
        <h1 className="text-white font-semibold">
          {import.meta.env.VITE_WEBSITE_NAME}
        </h1>
      </div>

      <div  className="relative">
        <div
          className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 cursor-pointer hover:bg-white/15 transition-colors"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15">
            <User size={14} className="text-white/80" />
          </div>
          <span className="text-sm font-medium text-white max-w-20 truncate">
            {user?.fullName.split(" ")[0]}
          </span>
        </div>

      </div>
    </div>
  );
}