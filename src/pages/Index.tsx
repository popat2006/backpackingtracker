import { MadeWithDyad } from "@/components/made-with-dyad";
import { usePeopleTracker } from "@/hooks/usePeopleTracker";
import AddPersonForm from "@/components/AddPersonForm";
import PersonCard from "@/components/PersonCard";

const Index = () => {
  const { people, addPerson, updatePersonMiles, updatePersonNights, deletePerson } = usePeopleTracker();

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
          people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onUpdateMiles={updatePersonMiles}
              onUpdateNights={updatePersonNights}
              onDeletePerson={deletePerson}
            />
          ))
        )}
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;