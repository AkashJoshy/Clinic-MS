import { defaultIcons, variantStyles } from "@/data/shared.data";
import type { StatusTickerProps } from "@/types/common";
import { useAuthStore } from "@/store";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

const MAX_SPEED = 160;
const MIN_SPEED = 80;
const SPEED_DROP_PER_CHAR = 2;

const StatusTicker = ({
  icon,
  message,
  variant = "info",
}: StatusTickerProps) => {
  const { admin } = useAuthStore((state) => state.users);
  const isDark = admin?.theme === "DARK";

  const styles = variantStyles[variant];
  const Icon = icon ?? defaultIcons[variant];

  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [messageWidth, setMessageWidth] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const messageElement = messageRef.current;

    if (!container || !messageElement) return;

    const measure = () => {
      setContainerWidth(container.clientWidth);
      setMessageWidth(messageElement.scrollWidth);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);

    resizeObserver.observe(container);
    resizeObserver.observe(messageElement);

    return () => resizeObserver.disconnect();
  }, [message]);

  const speed = Math.max(
    MIN_SPEED,
    MAX_SPEED - message.length * SPEED_DROP_PER_CHAR,
  );

  const distance = containerWidth + messageWidth;
  const duration = distance / speed;

  const isReady = containerWidth > 0 && messageWidth > 0;

  const themeStyles = {
    container: isDark
      ? "bg-[#0d1a27] border-white/10"
      : "bg-white border-gray-200",

    iconWrapper: isDark
      ? "border-white/10"
      : "border-gray-200",

    text: isDark
      ? "text-[#c1ccd9]"
      : "text-gray-700",
  };

  return (
    <div
      className={`flex h-10 w-full items-center overflow-hidden rounded-md border ${themeStyles.container} ${styles.container}`}
    >
      <div
        className={`flex h-full shrink-0 items-center border-r px-2.5 ${themeStyles.iconWrapper} ${styles.iconWrapper}`}
      >
        <Icon className={`h-4 w-4 ${styles.icon}`} />
      </div>

      <div
        ref={containerRef}
        className="relative flex h-full flex-1 items-center overflow-hidden"
      >
        <motion.div
          key={message}
          ref={messageRef}
          initial={{ x: containerWidth }}
          animate={
            isReady
              ? { x: [containerWidth, -messageWidth] }
              : { x: containerWidth }
          }
          transition={{
            duration: duration || 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute whitespace-nowrap text-xs font-medium tracking-wide ${themeStyles.text}`}
        >
          {message}
        </motion.div>
      </div>
    </div>
  );
};

export default StatusTicker;