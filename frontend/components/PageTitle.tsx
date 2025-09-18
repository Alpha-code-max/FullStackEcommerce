'use client';

import { motion } from 'framer-motion';

export function PageTitle() {
  return (
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
        Our Building Materials & Pricing
      </h2>
      <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
        Transparent pricing for <span className="font-semibold text-gray-700">original building materials</span>.  
        From <span className="text-blue-600 font-medium">construction</span> to <span className="text-purple-600 font-medium">renovation</span>,  
        we deliver high-quality solutions tailored to your building needs.
      </p>
    </motion.div>
  );
}
