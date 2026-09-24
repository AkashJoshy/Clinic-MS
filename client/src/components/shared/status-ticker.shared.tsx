import { defaultIcons, variantStyles } from "@/data/shared.data";
import type { StatusTickerProps } from "@/types/common";
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
        setMessageWidth(messageElement.offsetWidth);
    };
    
    measure();
    console.log([containerWidth, -messageWidth]);

    const resizeObserver = new ResizeObserver(() => {
      setContainerWidth(container.offsetWidth);
      setMessageWidth(messageElement.scrollWidth);
    });

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

  return (
    <div
      className={`w-full h-10 rounded-md overflow-hidden border flex items-center ${styles.container}`}
    >
      <div
        className={`shrink-0 px-2.5 h-full flex items-center border-r ${styles.iconWrapper}`}
      >
        <Icon className={`w-4 h-4 ${styles.icon}`} />
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden h-full flex items-center"
      >
        <motion.div
          key={message}
          ref={messageRef}
          initial={{ x: containerWidth }}
          animate={
            isReady
              ? {
                  x: [containerWidth, -messageWidth],
                }
              : { x: containerWidth }
          }
          transition={{
            duration: duration || 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute whitespace-nowrap text-xs font-medium tracking-wide"
        >
          {message}
        </motion.div>
      </div>
    </div>
  );
};

export default StatusTicker;
