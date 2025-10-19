import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { usePeopleTracker, Activity } from "@/hooks/usePeopleTracker";
import AddPersonForm from "@/components/AddPersonForm";
import PersonCard from "@/components/PersonCard";
import AddActivityForm from "@/components/AddActivityForm";
import ActivityChart from "@/components/ActivityChart";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSession } from "@/components/SessionContextProvider";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "@/utils/toast";

const Index = () => {
  const { people, addPerson, addActivity, deleteActivity, deletePerson, getPersonTotals, isLoading, error } = usePeopleTracker();
  const { user, isLoading: isSessionLoading } = useSession();
  const navigate = useNavigate();

  const [isAddActivityFormOpen, setIsAddActivityFormOpen] = useState(false);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

  const handleAddActivityClick = (personId: string) => {
    setSelectedPersonId(personId);
    setIsAddActivityFormOpen(true);
  };

  const handleAddActivitySubmit = (newActivity: Omit<Activity, "id">) => {
    if (selectedPersonId) {
      addActivity(selectedPersonId, newActivity);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError("Failed to sign out: " + error.message);
    } else {
      showSuccess("Signed out successfully!");
      navigate('/login');
    }
  };

  if (isLoading || isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading your data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">
          Hiking & Camping Tracker
        </h1>
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
      </div>

      <div className="w-full max-w-2xl mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <AddPersonForm onAddPerson={addPerson} />
        <Dialog open={isChartOpen} onOpenChange={setIsChartOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">View Activity Summary</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Activity Summary Chart</DialogTitle>
            </DialogHeader>
            <ActivityChart people={people} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {people.length === 0 ? (
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 col-span-full">
            No people added yet. Add someone to start tracking!
          </p>
        ) : (
          people.map((person) => {
            const { totalMiles, totalNights } = getPersonTotals(person.id);
            return (
              <PersonCard
                key={person.id}
                person={person}
                onDeletePerson={deletePerson}
                onAddActivityClick={handleAddActivityClick}
                onDeleteActivity={deleteActivity}
                totalMiles={totalMiles}
                totalNights={totalNights}
              />
            );
          })
        )}
      </div>

      <AddActivityForm
        isOpen={isAddActivityFormOpen}
        onClose={() => setIsAddActivityFormOpen(false)}
        onAddActivity={handleAddActivitySubmit}
      />
      <MadeWithDyad />
    </div>
  );
};

export default Index;