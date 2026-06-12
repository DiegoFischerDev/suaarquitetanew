import { cn } from "@/lib/utils";

type GradientBlurBackgroundProps = {
  className?: string;
};

export function GradientBlurBackground({ className }: GradientBlurBackgroundProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-0", className)} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ede9e1 1px, transparent 1px),
            linear-gradient(to bottom, #ede9e1 1px, transparent 1px),
            radial-gradient(circle 720px at 100% 15%, #ddd5f0, transparent)
          `,
          backgroundSize: "96px 64px, 96px 64px, 100% 100%",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d9d2c5 1px, transparent 1px),
            linear-gradient(to bottom, #d9d2c5 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
        }}
      />
    </div>
  );
}

export default GradientBlurBackground;
