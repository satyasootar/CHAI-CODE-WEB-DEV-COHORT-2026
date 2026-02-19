"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string; // Allow passing className
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'; // Optional direction
  delay?: number;
  duration?: number;
}

export function FadeIn({
  children,
  className = "",
  direction = 'up',
  delay = 0,
  duration = 0.5,
}: MotionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // Trigger earlier

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for children
export function StaggerContainer({
    children,
    className = "",
    delay = 0,
    staggerChildren = 0.1
}: { children: React.ReactNode, className?: string, delay?: number, staggerChildren?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: staggerChildren
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeInItem({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };
    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    )
}
