import { cn } from "@workspace/ui/lib/utils";

interface StatusBadgeProps {
  status: string;
}

const statusStyles = {
  Active: "bg-green-100 text-green-800 border-green-200",
  Discovery: "bg-blue-100 text-blue-800 border-blue-200",
  Settlement: "bg-purple-100 text-purple-800 border-purple-200",
  Closed: "bg-gray-100 text-gray-800 border-gray-200",
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"
      )}
    >
      {status}
    </span>
  );
} 