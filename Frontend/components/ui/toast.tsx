// components/ui/toast.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  title: string;
  description: string;
  variant?: "default" | "success" | "error";
  duration?: number;
  onClose?: () => void;
}

export const Toast = ({
  title,
  description,
  variant = "default",
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-violet-600 text-white";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md z-50 ${getVariantStyles()}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="mt-1">{description}</p>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                if (onClose) setTimeout(onClose, 300);
              }}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
