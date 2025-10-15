import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Activity {
  id: string;
  type: "hiking" | "camping";
  date: string; // ISO date string
  location: string;
  miles?: number; // Only for hiking
  nights?: number; // Only for camping
}

export interface Person {
  id: string;
  name: string;
  activities: Activity[];
}

const LOCAL_STORAGE_KEY = "hiking_camping_tracker_people";

export function usePeopleTracker() {
  const [people, setPeople] = useState<Person[]>(() => {
    if (typeof window !== "undefined") {
      const savedPeople = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedPeople ? JSON.parse(savedPeople) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(people));
    }
  }, [people]);

  const addPerson = (name: string) => {
    if (!name.trim()) return;
    const newPerson: Person = {
      id: uuidv4(),
      name: name.trim(),
      activities: [],
    };
    setPeople((prevPeople) => [...prevPeople, newPerson]);
  };

  const addActivity = (personId: string, newActivity: Omit<Activity, 'id'>) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === personId
          ? {
              ...person,
              activities: [...person.activities, { ...newActivity, id: uuidv4() }],
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

  return {
    people,
    addPerson,
    addActivity,
    deleteActivity,
    deletePerson,
    getPersonTotals,
  };
}