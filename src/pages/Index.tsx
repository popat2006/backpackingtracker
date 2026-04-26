import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import AddPersonForm from "@/components/AddPersonForm";
import PersonCard from "@/components/PersonCard";
import AddActivityForm from "@/components/AddActivityForm";
import ActivityChart from "@/components/ActivityChart";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// Define types for local state
export interface Activity {
  id: string;
  type: "hiking" | "camping";
  date: string; // YYYY-MM-DD
  location: string;
  miles?: number; // Only for hiking
  nights?: number; // Only for camping
}

export interface Person {
  id: string;
  name: string;
  activities: Activity[];
}

const Index = () => {
  const navigate = useNavigate();
  const [people, setPeople] = useState<Person[]>([]);
  const [isAddActivityFormOpen, setIsAddActivityFormOpen] = useState(false);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

  const addPerson = (name: string) => {
    const newPerson: Person = {
      id: uuidv4(),
      name: name.trim(),
      activities: [],
    };
    setPeople((prevPeople) => [...prevPeople, newPerson]);
  };

  const addActivity = (personId: string, newActivity: Omit<Activity, 'id'>) => {
    const activityWithId: Activity = {
      ...newActivity,
      id: uuidv4(),
      miles: newActivity.miles || 0,
      nights: newActivity.nights || 0,
    };
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === personId
          ? {
              ...person,
              activities: [...person.activities, activityWithId],
            }
          : person,
      ),
    );
  };

  const deleteActivity = (personId: string, activityId: string) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === personId
          ? {
              ...person,
              activities: person.activities.filter((activity) => activity.id !== activityId),
            }
          : person,
      ),
    );
  };

  const deletePerson = (id: string) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
  };

  const getPersonTotals = (personId: string) => {
    const person = people.find((p) => p.id === personId);
    if (!person) return { totalMiles: 0, totalNights: 0 };

    const totalMiles = person.activities.reduce((sum, activity) => sum + (activity.miles || 0), 0);
    const totalNights = person.activities.reduce((sum, activity) => sum + (activity.nights || 0), 0);
    return { totalMiles, totalNights };
  };

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
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">
          Hiking & Camping Tracker
        </h1>
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
        <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate("/summary")}>
          View Journal Summary
        </Button>
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