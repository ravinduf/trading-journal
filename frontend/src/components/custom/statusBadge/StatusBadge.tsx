import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const typeStyles = {
  green: "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10",
  red: "bg-destructive/10 text-destructive hover:bg-destructive/10",
} as const;

export type StatusBadgeType = keyof typeof typeStyles;

type StatusBadgeProps = {
  type: StatusBadgeType;
  text: string;
  className?: string;
};

const StatusBadge = ({ type, text, className }: StatusBadgeProps) => {
  return (
    <Badge
      className={cn(
        "rounded px-2 py-0.5 text-[9px] font-bold uppercase",
        typeStyles[type],
        className
      )}
    >
      {text}
    </Badge>
  );
};

export default StatusBadge;
