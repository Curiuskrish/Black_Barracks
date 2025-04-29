import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ className = '', count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={`relative overflow-hidden ${className}`}>
          <div className="bg-slate-700 rounded-md w-full h-full">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;