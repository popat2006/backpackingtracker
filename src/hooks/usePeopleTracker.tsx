import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/components/SessionContextProvider";
import { showSuccess, showError, showLoading, dismissToast } from "@/utils/toast";

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

export function usePeopleTracker() {
  const { user, isLoading: isSessionLoading } = useSession();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPeopleAndActivities = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    const loadingToastId = showLoading("Loading your data...");

    try {
      const { data: peopleData, error: peopleError } = await supabase
        .from("people")
        .select("id, name")
        .eq("user_id", user.id);

      if (peopleError) throw peopleError;

      const { data: activitiesData, error: activitiesError } = await supabase
        .from("activities")
        .select("id, person_id, type, date, location, miles, nights")
        .eq("user_id", user.id);

      if (activitiesError) throw activitiesError;

      const peopleWithActivities: Person[] = peopleData.map((person) => ({
        ...person,
        activities: activitiesData
          .filter((activity) => activity.person_id === person.id)
          .map((activity) => ({
            id: activity.id,
            type: activity.type as "hiking" | "camping",
            date: activity.date,
            location: activity.location,
            miles: activity.miles || 0,
            nights: activity.nights || 0,
          })),
      }));

      setPeople(peopleWithActivities);
      showSuccess("Data loaded successfully!");
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to load data.");
      showError("Failed to load data: " + (err.message || "Unknown error"));
    } finally {
      setIsLoading(false);
      dismissToast(loadingToastId);
    }
  }, [user]);

  useEffect(() => {
    if (!isSessionLoading) {
      fetchPeopleAndActivities();
    }
  }, [isSessionLoading, fetchPeopleAndActivities]);

  const addPerson = async (name: string) => {
    if (!user || !name.trim()) return;

    const loadingToastId = showLoading("Adding person...");
    try {
      const { data, error } = await supabase
        .from("people")
        .insert({ name: name.trim(), user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      setPeople((prevPeople) => [...prevPeople, { ...data, activities: [] }]);
      showSuccess("Person added successfully!");
    } catch (err: any) {
      console.error("Error adding person:", err);
      showError("Failed to add person: " + (err.message || "Unknown error"));
    } finally {
      dismissToast(loadingToastId);
    }
  };

  const addActivity = async (personId: string, newActivity: Omit<Activity, 'id'>) => {
    if (!user) return;

    const loadingToastId = showLoading("Adding activity...");
    try {
      const { data, error } = await supabase
        .from("activities")
        .insert({
          ...newActivity,
          person_id: personId,
          user_id: user.id,
          miles: newActivity.miles || null, // Ensure null for 0 or undefined
          nights: newActivity.nights || null, // Ensure null for 0 or undefined
        })
        .select()
        .single();

      if (error) throw error;

      setPeople((prevPeople) =>
        prevPeople.map((person) =>
          person.id === personId
            ? {
                ...person,
                activities: [...person.activities, { ...data, miles: data.miles || 0, nights: data.nights || 0 }],
              }
            : person,
        ),
      );
      showSuccess("Activity added successfully!");
    } catch (err: any) {
      console.error("Error adding activity:", err);
      showError("Failed to add activity: " + (err.message || "Unknown error"));
    } finally {
      dismissToast(loadingToastId);
    }
  };

  const deleteActivity = async (personId: string, activityId: string) => {
    if (!user) return;

    const loadingToastId = showLoading("Deleting activity...");
    try {
      const { error } = await supabase
        .from("activities")
        .delete()
        .eq("id", activityId)
        .eq("user_id", user.id); // Ensure user can only delete their own activities

      if (error) throw error;

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
      showSuccess("Activity deleted successfully!");
    } catch (err: any) {
      console.error("Error deleting activity:", err);
      showError("Failed to delete activity: " + (err.message || "Unknown error"));
    } finally {
      dismissToast(loadingToastId);
    }
  };

  const deletePerson = async (id: string) => {
    if (!user) return;

    const loadingToastId = showLoading("Deleting person...");
    try {
      const { error } = await supabase
        .from("people")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id); // Ensure user can only delete their own people

      if (error) throw error;

      setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
      showSuccess("Person deleted successfully!");
    } catch (err: any) {
      console.error("Error deleting person:", err);
      showError("Failed to delete person: " + (err.message || "Unknown error"));
    } finally {
      dismissToast(loadingToastId);
    }
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
    isLoading: isLoading || isSessionLoading,
    error,
    user,
  };
}