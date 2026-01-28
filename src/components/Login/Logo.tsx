import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  color?: string;
}

export default function Logo({ className = "", color = "text-primary" }: LogoProps) {
  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Abstract logo mark */}
      <div className="relative">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={color}
        >
          <path
            d="M8 6C8 4.89543 8.89543 4 10 4H26C27.1046 4 28 4.89543 28 6V12C28 13.1046 27.1046 14 26 14H10C8.89543 14 8 13.1046 8 12V6Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <path
            d="M4 16C4 14.8954 4.89543 14 6 14H22C23.1046 14 24 14.8954 24 16V22C24 23.1046 23.1046 24 22 24H6C4.89543 24 4 23.1046 4 22V16Z"
            fill="currentColor"
          />
          <path
            d="M12 26C12 24.8954 12.8954 24 14 24H30C31.1046 24 32 24.8954 32 26V30C32 31.1046 31.1046 32 30 32H14C12.8954 32 12 31.1046 12 30V26Z"
            fill="currentColor"
            fillOpacity="0.6"
          />
        </svg>
      </div>
      <span className={`text-2xl font-bold ${color} tracking-tight`}>
        TaskOS
      </span>
    </motion.div>
  );
}
