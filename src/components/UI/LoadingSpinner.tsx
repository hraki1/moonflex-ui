// components/LoadingSpinner.tsx
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  const barVariants = {
    initial: { scaleY: 0.1 },
    animate: { 
      scaleY: [0.1, 1, 0.1],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    initial: {},
    animate: { 
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Netflix N Logo */}
      <div className="relative w-24 h-24 mb-5">
        <span className="absolute text-7xl font-extrabold text-netflix-red font-sans z-10">
          N
        </span>
        
        {/* Animated Bars */}
        <motion.div 
          className="absolute w-full h-full flex items-center justify-center"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-20 bg-netflix-red mx-1 origin-bottom"
              variants={barVariants}
            />
          ))}
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.p 
        className="text-white font-sans text-lg tracking-wider mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;