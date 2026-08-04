import { useAuthStore } from "@/store";
import { Activity, Check, ChevronDown, LogOut, PlusCircle, UserRound, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Patient, PatientProfile } from "@/types/patient";
import AddProfileModal from "./AddProfileModal";


export function Header() {
  const patients = useAuthStore(state => state.patients);
  const activePatient = useAuthStore(state => state.activePatient);
  const user = useAuthStore(state => state.user);
  const setActivePatient = useAuthStore(state => state.setActivePatient);
  const [open, setOpen] = useState(false);
  const [isAddOpen, setAddOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    
    if (open) {
      window.addEventListener("mousedown", handleClickOutside)
    }
    
    return () => window.addEventListener("mousedown", handleClickOutside)
  }, [open])
  
  function switchProfile(patient: PatientProfile) {
    if (!activePatient || !patient) return
    if (activePatient.patient?.id === patient.patient?.id) return
    setActivePatient(patient)
  }

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

      <div ref={ref} className="relative">
        <div
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 cursor-pointer hover:bg-white/15 transition-colors"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15">
            <Users size={14} className="text-white/80" />
          </div>
          <span className="text-sm font-medium text-white max-w-20 truncate">
            {activePatient?.patient?.displayName}
          </span>
          <ChevronDown
            size={14}
            className="text-white/50 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#1a1a2e] shadow-xl overflow-hidden z-50">

            <div className="p-1">
              <p className="px-2 pt-2 pb-1 text-[10px] font-semibold tracking-widest text-white/30 uppercase">
                Profiles
              </p>
              {patients.map((patient) => {
                const isActive = patient.patient?.id === activePatient!.patient?.id;

                return (
                  <button
                    key={patient.patient?.id}
                    onClick={() => switchProfile(patient)}
                    className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/8 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                        <UserRound size={13} className="text-white/60" />
                      </div>
                      <div className="text-left">
                        <p className={`text-sm leading-tight ${isActive ? "text-white font-medium" : "text-white/60 group-hover:text-white/80"}`}>
                          {patient.patient?.displayName}
                        </p>
                        <p className="text-[10px] text-white/30 capitalize">
                          {patient.patient?.relation.toLowerCase()}
                        </p>
                      </div>
                    </div>
                    {isActive && <Check size={13} className="text-white/70 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/8 p-1">
              <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/8 transition-colors group" onClick={() => setAddOpen(true)}>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                  <PlusCircle size={13} className="text-white/40 group-hover:text-white/70 transition-colors" />
                </div>
                <span className="text-sm text-white/40 group-hover:text-white/70 transition-colors">
                  Add profile
                </span>
              </button>
            </div>
            <AddProfileModal isOpen={isAddOpen} onClose={() => setAddOpen(false)} />
            <div className="border-t border-white/8 p-1">
              <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-red-500/10 transition-colors group">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                  <LogOut size={13} className="text-red-400/50 group-hover:text-red-400 transition-colors" />
                </div>
                <span className="text-sm text-red-400/50 group-hover:text-red-400 transition-colors">
                  Sign out
                </span>
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}