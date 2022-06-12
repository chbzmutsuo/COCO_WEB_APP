import { motion } from 'framer-motion';
import React from 'react';

export default function BtnBasic({
  children,
  className = 'bg-gray-500 text-white',
  type = 'button',
  onClick,
  center,
  fromScratch,
}) {
  let textAdjustClass = center ? ' text-center mx-auto w-full cursor-pointer' : '';

  return (
    <motion.div className={textAdjustClass} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      {!fromScratch && (
        <button type={type} className={`my-2 rounded px-2 py-1 ${className}`} onClick={onClick}>
          {children}
        </button>
      )}
      {fromScratch && (
        <button className={`cursor-pointer ${className}`} onClick={onClick}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
