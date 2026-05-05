import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      {/* Mobile Logo */}
      <div className="block md:hidden">
        <Image
          src="/images/SynSeam Assets/logo-sm.png"
          alt="SynSeam"
          width={32}
          height={32}
          className="h-8 w-auto object-contain"
          priority
        />
      </div>

      {/* Desktop Logo */}
      <div className="hidden md:block">
        <Image
          src="/images/SynSeam Assets/logo.png"
          alt="SynSeam"
          width={140}
          height={40}
          className="h-9 w-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
