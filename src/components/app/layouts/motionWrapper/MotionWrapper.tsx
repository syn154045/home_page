'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();

    return (
        <motion.div
            key={pathName}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                scale: 0.2,
                transition: {
                    type: 'tween',
                    duration: 0.5,
                    ease: 'easeInOut',
                },
            }}
            transition={{ duration: 1.5 }}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;
