import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Person {
  id: string;
  name: string;
  miles: number;
  nights: number;
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
      miles: 0,
      nights: 0,
    };
    setPeople((prevPeople) => [...prevPeople, newPerson]);
  };

  const updatePersonMiles = (id: string, delta: number) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === id ? { ...person, miles: Math.max(0, person.miles + delta) } : person,
      ),
    );
  };

  const updatePersonNights = (id: string, delta: number) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === id ? { ...person, nights: Math.max(0, person.nights + delta) } : person,
      ),
    );
  };

  const deletePerson = (id: string) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
  };

  return {
    people,
    addPerson,
    updatePersonMiles,
    updatePersonNights,
    deletePerson,
  };
}