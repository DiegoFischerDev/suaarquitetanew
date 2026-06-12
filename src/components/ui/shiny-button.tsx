"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const shinyAnimation = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop" as const,
    repeatDelay: 1,
    type: "spring" as const,
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring" as const,
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

type ShinyButtonBaseProps = {
  children: ReactNode;
  className?: string;
  spanClassName?: string;
};

type ShinyButtonAsButton = ShinyButtonBaseProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
};

type ShinyButtonAsLink = ShinyButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

type ShinyButtonProps = ShinyButtonAsButton | ShinyButtonAsLink;

function ShinyButtonContent({
  children,
  spanClassName,
}: {
  children: ReactNode;
  spanClassName?: string;
}) {
  return (
    <>
      <span
        className={cn(
          "relative flex size-full w-full items-center justify-center text-center text-sm font-medium tracking-wide",
          spanClassName,
        )}
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
          WebkitMaskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
        aria-hidden
      />
    </>
  );
}

export function ShinyButton(props: ShinyButtonProps) {
  const { children, className, spanClassName } = props;
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion ? { whileTap: { scale: 0.97 } } : shinyAnimation;

  const sharedClassName = cn(
    "relative inline-flex cursor-pointer items-center justify-center rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow-[0_0_20px_hsl(var(--primary)/15%)] [--primary:40_33%_98%]",
    className,
  );

  if ("href" in props && props.href) {
    const { href, target, rel, onClick, "aria-label": ariaLabel } = props;

    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        {...motionProps}
        className={sharedClassName}
      >
        <ShinyButtonContent spanClassName={spanClassName}>
          {children}
        </ShinyButtonContent>
      </motion.a>
    );
  }

  const {
    type = "button",
    onClick,
    disabled,
    "aria-label": ariaLabel,
  } = props as ShinyButtonAsButton;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...motionProps}
      className={sharedClassName}
    >
      <ShinyButtonContent spanClassName={spanClassName}>
        {children}
      </ShinyButtonContent>
    </motion.button>
  );
}

export default ShinyButton;
