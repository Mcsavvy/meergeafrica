import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  className?: string;
}

export function StatsCard({ title, value, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("p-6 relative", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
          <p className="text-sm text-green-500 mt-1">{trend}</p>
        </div>
        <InfoIcon className="w-5 h-5 opacity-50" />
      </div>
    </Card>
  );
}
