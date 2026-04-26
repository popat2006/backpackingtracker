import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Tent, Footprints } from "lucide-react";
import type { Hike, CampingTrip } from "@/types/hike";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AddHikeForm from "@/components/AddHikeForm";
import AddCampingForm from "@/components/AddCampingForm";
import HikeCard from "@/components/HikeCard";
import CampingCard from "@/components/CampingCard";
import SummaryStats from "@/components/SummaryStats";

const Index = () => {
  const [hikes, setHikes] = useLocalStorage<Hike[]>("hike-tracker-hikes", []);
  const [campingTrips, setCampingTrips] = useLocalStorage<CampingTrip[]>("hike-tracker-camping", []);
  const [showHikeForm, setShowHikeForm] = useState(false);
  const [showCampingForm, setShowCampingForm] = useState(false);

  const addHike = (hike: Hike) => {
    setHikes((prev) => [hike].concat(prev));
  };

  const deleteHike = (id: string) => {
    setHikes((prev) => prev.filter((h) => h.id !== id));
  };

  const addCamping = (trip: CampingTrip) => {
    setCampingTrips((prev) => [trip].concat(prev));
  };

  const deleteCamping = (id: string) => {
    setCampingTrips((prev) => prev.filter((t) => t.id !== id));
  };

  const totalMiles = hikes.reduce((sum, h) => sum + h.miles, 0);
  const totalNights = campingTrips.reduce((sum, t) => sum + t.nights, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
              Hike & Camp Journal
            </h1>
            <p className="text-sm text-gray-500">
              {hikes.length} hike{hikes.length !== 1 ? "s" : ""} &bull; {campingTrips.length} camping trip{campingTrips.length !== 1 ? "s" : ""} &bull; {totalMiles.toFixed(1)} mi &bull; {totalNights} night{totalNights !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowHikeForm(true)} size="sm">
              <Plus className="w-4 h-4 mr-1" /> Add Hike
            </Button>
            <Button onClick={() => setShowCampingForm(true)} variant="outline" size="sm">
              <Tent className="w-4 h-4 mr-1" /> Add Camping
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Summary Stats */}
        <SummaryStats hikes={hikes} campingTrips={campingTrips} />

        {/* Tabs for Hikes and Camping */}
        <Tabs defaultValue="hikes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hikes" className="flex items-center gap-2">
              <Footprints className="w-4 h-4" /> Hikes ({hikes.length})
            </TabsTrigger>
            <TabsTrigger value="camping" className="flex items-center gap-2">
              <Tent className="w-4 h-4" /> Camping ({campingTrips.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hikes" className="space-y-3 mt-4">
            {hikes.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Footprints className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium">No hikes yet</p>
                <p className="text-sm">Click "Add Hike" to log your first trail!</p>
              </div>
            ) : (
              hikes.map((hike) => (
                <HikeCard key={hike.id} hike={hike} onDelete={deleteHike} />
              ))
            )}
          </TabsContent>

          <TabsContent value="camping" className="space-y-3 mt-4">
            {campingTrips.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Tent className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium">No camping trips yet</p>
                <p className="text-sm">Click "Add Camping" to log your first trip!</p>
              </div>
            ) : (
              campingTrips.map((trip) => (
                <CampingCard key={trip.id} trip={trip} onDelete={deleteCamping} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Forms */}
      <AddHikeForm open={showHikeForm} onClose={() => setShowHikeForm(false)} onAdd={addHike} />
      <AddCampingForm open={showCampingForm} onClose={() => setShowCampingForm(false)} onAdd={addCamping} />
    </div>
  );
};

export default Index;
