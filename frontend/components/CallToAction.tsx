'use client';

import { motion } from 'framer-motion';

export function CallToAction() {
  return (
    <motion.div
      className="bg-blue-700 rounded-3xl text-white text-center py-14 px-10 mt-20 shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <h3 className="text-3xl font-bold mb-5 tracking-tight">
        Need Quality Building Materials?
      </h3>
      <p className="text-yellow-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
        From cement and steel rods to pipes, nails, and tools — we supply durable construction 
        materials at the best prices. Order today and get fast delivery to your project site.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-yellow-50 transition-all"
        >
          Order Materials
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-yellow-700 shadow-md hover:shadow-lg transition-all"
        >
          Request Delivery
        </motion.button>
      </div>
    </motion.div>
  );
}
