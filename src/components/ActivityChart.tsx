import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Person } from "@/hooks/usePeopleTracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityChartProps {
  people: Person[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ people }) => {
  const chartData = people.map((person) => {
    const totalMiles = person.activities.reduce((sum, activity) => sum + (activity.miles || 0), 0);
    const totalNights = person.activities.reduce((sum, activity) => sum + (activity.nights || 0), 0);
    return {
      name: person.name,
      "Hiking Miles": totalMiles,
      "Camping Nights": totalNights,
    };
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Activity Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {people.length === 0 ? (
          <p className="text-center text-lg text-muted-foreground">No data to display. Add some people and activities!</p>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Hiking Miles" fill="#3b82f6" /> {/* Blue */}
                <Bar dataKey="Camping Nights" fill="#22c55e" /> {/* Green */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityChart;