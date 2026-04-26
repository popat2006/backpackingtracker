import { Hike, CampingTrip } from "@/types/hike";
import { MapPin, Ruler, Moon, TreePine, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryStatsProps {
  hikes: Hike[];
  campingTrips: CampingTrip[];
}

const SummaryStats = ({ hikes, campingTrips }: SummaryStatsProps) => {
  const totalHikes = hikes.length;
  const totalMiles = hikes.reduce((sum, h) => sum + h.miles, 0);
  const totalCampingTrips = campingTrips.length;
  const totalNights = campingTrips.reduce((sum, t) => sum + t.nights, 0);

  const allLocations = hikes.map((h) => h.location).concat(campingTrips.map((t) => t.location));
  const uniqueLocations = new Set(allLocations).size;

  const stats = [
    { icon: <TreePine className="w-5 h-5 text-green-600" />, label: "Total Hikes", value: totalHikes },
    { icon: <Ruler className="w-5 h-5 text-blue-600" />, label: "Total Miles", value: totalMiles.toFixed(1) },
    { icon: <Moon className="w-5 h-5 text-purple-600" />, label: "Camping Trips", value: totalCampingTrips },
    { icon: <MapPin className="w-5 h-5 text-red-600" />, label: "Total Nights", value: totalNights },
    { icon: <BarChart3 className="w-5 h-5 text-orange-600" />, label: "Unique Locations", value: uniqueLocations },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            {stat.icon}
            <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryStats;
