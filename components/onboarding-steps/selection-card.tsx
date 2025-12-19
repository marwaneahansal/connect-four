import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface SelectionCardProps {
  active: boolean;
  onClick: () => void;
  icon?: any;
  title: string;
  description?: string;
  disabled?: boolean;
}

export const SelectionCard = ({
  active,
  onClick,
  icon: Icon,
  title,
  description,
  disabled,
}: SelectionCardProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 w-full h-full",
      active && !disabled
        ? "border-red bg-red/10 text-white shadow-[0_0_20px_rgba(255,0,0,0.3)]"
        : disabled
        ? "border-white/10 bg-white/5 text-white/30 opacity-80 cursor-not-allowed"
        : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:border-white/20"
    )}
  >
    {disabled && (
      <div className="hidden group-hover:flex absolute inset-0 items-center justify-center rounded-xl bg-black backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          <Lock className="w-6 h-6 text-white/80" />
          <span className="text-xs font-semibold text-white/80">
            Coming Soon
          </span>
        </div>
      </div>
    )}
    {Icon && (
      <Icon
        className={cn(
          "w-8 h-8 mb-3",
          active && !disabled ? "text-red" : "text-white/40"
        )}
      />
    )}
    <div className="font-bold text-lg">{title}</div>
    {description && (
      <div className="text-xs text-white/40 mt-1">{description}</div>
    )}
  </button>
);
