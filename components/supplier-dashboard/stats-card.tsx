import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  className?: string;
  variant?: "primary" | "default";
}

export function StatsCard({ title, value, trend, className, variant = "default" }: StatsCardProps) {
  return (
    <Card 
      className={cn(
        "p-6 relative", 
        variant === "primary" ? "bg-gradient-to-r from-[#0E2254] to-blue-600 text-white" : "bg-white",
        className
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          variant === "primary" ? "bg-white/10" : "bg-[#F5F5F5]"
        )}>
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
      <p className="text-[40px] font-bold mb-3">{value}</p>
      <span className={cn(
        "text-sm px-3 py-1 rounded-full",
        variant === "primary" 
          ? "bg-white/20" 
          : "bg-green-100 text-green-800"
      )}>
        {trend}
      </span>
    </Card>
  );
}
