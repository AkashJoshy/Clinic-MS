import type { StatCardProps } from "@/types/doctor-dashboard";
import { motion, AnimatePresence } from "framer-motion";

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  details,
  footer,
  index,
  theme,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className={`group relative min-h-[190px] overflow-hidden rounded-[10px] border ${theme.border} bg-[#111c2b] p-5 shadow-lg shadow-black/10 transition-all duration-300 hover:shadow-xl`}
    >
      <div
        className={`pointer-events-none absolute -right-12 -top-12 size-36 rounded-full ${theme.glow} opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-25`}
      />

      <div
        className={`absolute left-0 top-0 h-[2px] w-full ${theme.accent} opacity-70`}
      />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.12 + 0.25,
            type: "spring",
            stiffness: 200,
            damping: 12,
          }}
          className={`rounded-xl border border-white/5 p-3 ${theme.icon}`}
        >
          <Icon className="size-5" />
        </motion.div>
      </div>

      <div className="relative mt-5">
        <AnimatePresence mode="wait">
          <motion.h3
            key={value}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className={`text-3xl font-bold tracking-tight ${theme.value}`}
          >
            {value}
          </motion.h3>
        </AnimatePresence>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-x-5 gap-y-3">
        {details.map((item, detailIndex) => {
          const DetailIcon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.12 + 0.3 + detailIndex * 0.08,
                duration: 0.3,
              }}
              className="flex items-center gap-1.5 text-xs"
            >
              <DetailIcon className={`size-3.5 ${item.color}`} />
              <span className="text-slate-500">{item.label}</span>
              <span className="font-semibold text-slate-200">{item.value}</span>
            </motion.div>
          );
        })}
      </div>

      {footer && (
        <div className="relative mt-4 border-t border-white/[0.07] pt-3 text-xs leading-relaxed text-slate-500">
          {footer}
        </div>
      )}
    </motion.div>
  );
};
