// components/LoadingSpinner.tsx
import React from "react";

interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading",
  size = "md",
  className = "",
}) => {
  const sizeMap = {
    sm: {
      container: "h-8 w-8",
      border: "border-3",
    },
    md: {
      container: "h-12 w-12",
      border: "border-4",
    },
    lg: {
      container: "h-16 w-16",
      border: "border-6",
    },
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      {/* Main spinner */}
      <div className="relative">
        {/* Outer ring with glow effect */}
        <div
          className={`${sizeMap[size].container} ${sizeMap[size].border} border-gray-800 rounded-full animate-spin`}
          style={{
            animationDuration: "1.5s",
            borderTopColor: "#e50914",
            boxShadow: "0 0 0 0 rgba(229, 9, 20, 0.7)",
          }}
        ></div>

        {/* Inner glow effect */}
        <div
          className={`absolute inset-0 ${sizeMap[size].border} border-transparent rounded-full animate-spin`}
          style={{
            animationDuration: "2s",
            borderTopColor: "#e50914",
            filter: "blur(2px)",
            opacity: 0.7,
          }}
        ></div>
      </div>

      {/* Loading text */}
      <p className="text-red-500 font-sans font-medium text-sm uppercase tracking-wider animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default LoadingSpinner;
