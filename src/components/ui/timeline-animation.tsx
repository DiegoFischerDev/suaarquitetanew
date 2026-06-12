"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";

type TimelineContentProps = {
  as?: ElementType;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants: Variants;
  children: ReactNode;
  className?: string;
};

export function TimelineContent({
  as: Tag = "div",
  animationNum,
  timelineRef,
  customVariants,
  children,
  className,
}: TimelineContentProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const MotionComponent = motion.create(Tag);

  return (
    <MotionComponent
      ref={ref}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants}
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  );
}
