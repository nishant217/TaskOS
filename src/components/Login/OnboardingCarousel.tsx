import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import onboarding1 from "@/assets/onboarding-1.png";
import onboarding2 from "@/assets/onboarding-2.png";
import onboarding3 from "@/assets/onboarding-3.png";

const slides = [
  {
    image: onboarding1,
    title: "The #1 software development tool used by agile teams.",
  },
  {
    image: onboarding2,
    title: "Track tasks, project status, and time spent on work.",
  },
  {
    image: onboarding3,
    title: "Get real-time notifications about activity across all your sites.",
  },
];

interface OnboardingCarouselProps {
  className?: string;
}

export default function OnboardingCarousel({ className = "" }: OnboardingCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Image area */}
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slides[current].image}
            alt="Onboarding illustration"
            className="w-full h-full object-contain"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
      </div>

      {/* Title */}
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          className="mt-8 text-center text-foreground text-lg md:text-xl font-medium max-w-xs md:max-w-sm px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {slides[current].title}
        </motion.p>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-dot-active w-6"
                : "bg-dot-inactive"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
