
import { BadgeDollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EarningsSummaryProps {
  today: number;
  thisWeek: number;
  thisMonth: number;
  changePercentage: number;
}

const EarningsSummary = ({ today, thisWeek, thisMonth, changePercentage }: EarningsSummaryProps) => {
  const isPositiveChange = changePercentage >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Earnings Summary</CardTitle>
        <BadgeDollarSign className="h-5 w-5 text-welli-accent" />
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-welli-textSecondary">Today</p>
            <p className="text-2xl font-semibold">${today}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-welli-textSecondary">This Week</p>
            <p className="text-2xl font-semibold">${thisWeek}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-welli-textSecondary">This Month</p>
            <p className="text-2xl font-semibold">${thisMonth}</p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <div className={cn(
            "inline-flex items-center rounded-full px-2 py-1 text-xs",
            isPositiveChange ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}>
            {isPositiveChange ? (
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 mr-1" />
            )}
            <span>{Math.abs(changePercentage)}% {isPositiveChange ? 'up' : 'down'}</span>
          </div>
          <span className="ml-2 text-xs text-welli-textSecondary">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsSummary;
