import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const PartyBlaster = () => {
  const [confetti, setConfetti] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [isBlasting, setIsBlasting] = useState(false);

  // Generate confetti pieces with blast physics
  useEffect(() => {
    const generateBlastConfetti = () => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#ff9f43', '#00d2d3', '#ff6b6b', '#48dbfb'];
      const newConfetti = [];
      
      for (let i = 0; i < 150; i++) { // Increased from 80 to 150
        const angle = (Math.PI * 2 * i) / 150; // Distribute in a circle
        const velocity = Math.random() * 400 + 300; // Increased velocity range
        const spreadAngle = Math.random() * Math.PI * 2 - Math.PI; // Full 360° spread
        
        newConfetti.push({
          id: i,
          x: window.innerWidth / 2, // Start from center
          y: window.innerHeight, // Start from bottom
          vx: Math.cos(angle + spreadAngle) * velocity * 0.015, // Increased horizontal spread
          vy: -Math.sin(angle + spreadAngle) * velocity * 0.015, // Increased vertical velocity
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 10 + 3, // Slightly larger pieces
          rotation: Math.random() * 360,
          gravity: 0.25, // Slightly reduced gravity for longer flight
          delay: Math.random() * 0.8, // Increased delay range
          duration: Math.random() * 5 + 4 // Longer duration
        });
      }
      setConfetti(newConfetti);
      setIsBlasting(true);
    };

    // Generate sparkles
    const generateSparkles = () => {
      const newSparkles = [];
      
      for (let i = 0; i < 80; i++) { // Increased from 40 to 80
        newSparkles.push({
          id: i,
          x: window.innerWidth / 2,
          y: window.innerHeight,
          vx: (Math.random() - 0.5) * 600 * 0.015, // Increased horizontal spread
          vy: -Math.random() * 500 * 0.015, // Increased vertical velocity
          delay: Math.random() * 0.6, // Increased delay range
          duration: Math.random() * 3 + 2 // Longer duration
        });
      }
      setSparkles(newSparkles);
    };

    generateBlastConfetti();
    generateSparkles();

    // Cleanup after animation
    const timer = setTimeout(() => {
      setConfetti([]);
      setSparkles([]);
      setIsBlasting(false);
    }, 8000); // Increased duration to 8 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Blast effect from bottom center */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          y: [0, -80, -150]
        }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
      />

      {/* Confetti with physics */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            rotate: piece.rotation
          }}
          initial={{ 
            x: piece.x, 
            y: piece.y,
            opacity: 0 
          }}
          animate={{
            x: piece.x + piece.vx * 150, // Increased travel distance
            y: piece.y + piece.vy * 150 + (piece.gravity * 80), // Increased travel distance
            opacity: [0, 1, 1, 0],
            rotate: piece.rotation + 1080 // More rotation
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Sparkles with physics */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            boxShadow: '0 0 8px #ffd700, 0 0 16px #ffd700' // Enhanced glow
          }}
          initial={{ 
            x: sparkle.x, 
            y: sparkle.y,
            scale: 0, 
            opacity: 0 
          }}
          animate={{
            x: sparkle.x + sparkle.vx * 120, // Increased travel distance
            y: sparkle.y + sparkle.vy * 120 + (0.15 * 60), // Increased travel distance
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Secondary burst effect */}
      {/* <motion.div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 15, 0],
          opacity: [0, 0.4, 0]
        }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: "easeOut"
        }}
      /> */}

      {/* Celebration text */}
      {/* <motion.div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-gradient"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.2, 1],
          opacity: [0, 1, 1]
        }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: "easeOut"
        }}
      >
        🎉 Amazing! 🎉
      </motion.div> */}
    </div>
  );
};

export default PartyBlaster; 