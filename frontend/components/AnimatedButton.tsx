'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface AnimatedButtonProps {
  text: string;
  href: string;
  className?: string;
}

export function AnimatedButton({ text, href, className = '' }: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href} passHref>
      <motion.div
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-full cursor-pointer ${className}`}
        initial={{ scale: 1 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <span>{text}</span>
        <motion.div
          animate={{
            x: isHovered ? 5 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </Link>
  );
}