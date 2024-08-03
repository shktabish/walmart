import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";

const getRandomAmplitude = (index) => {
  return 10 + (index * 5) % 25;
};

const getRandomDuration = (index) => {
  return 2 + (index * 4) % 10;
};

export const MouseBadge = ({ text, color, arrowPos, badgePos, index }) => {
  const amplitude = getRandomAmplitude(index);
  const duration = getRandomDuration(index);

  return (
    <motion.div
      className={`absolute ${badgePos} max-md:hidden`}
      initial={{ x: 0, y: 0 }}
      animate={{
        x: [0, amplitude, 0, -amplitude, 0],
        y: [0, 0, amplitude, 0, -amplitude, 0]
      }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "easeInOut"
        },
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "easeInOut"
        }
      }}
    >
      <div
        className="text-black font-semibold px-6 py-2 rounded-full relative capitalize"
        style={{ backgroundColor: color }}
      >
        {text}
        <FaLocationArrow
          className={`text-2xl absolute ${arrowPos}`}
          style={{ color: color }}
        />
      </div>
    </motion.div>
  );
};
