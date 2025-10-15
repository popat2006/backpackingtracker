import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { usePeopleTracker, Activity } from "@/hooks/usePeopleTracker";
import AddPersonForm from "@/components/AddPersonForm";
import PersonCard from "@/components/PersonCard";
import AddActivityForm from "@/components/AddActivityForm";

const Index = () => {
  const { people, addPerson, addActivity, deleteActivity, deletePerson, getPersonTotals } = usePeopleTracker();
  const [isAddActivityFormOpen, setIsAddActivityFormOpen] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-blue-600 dark:text-blue-400">
        Hiking & Camping Tracker
      </h1>

      <div className="w-full max-w-2xl mb-8">
        <AddPersonForm onAddPerson={addPerson} />
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