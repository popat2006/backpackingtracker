import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Mountain, Tent } from "lucide-react";
import { Person, Activity } from "@/hooks/usePeopleTracker";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

interface PersonCardProps {
  person: Person;
  onDeletePerson: (id: string) => void;
  onAddActivityClick: (personId: string) => void;
  onDeleteActivity: (personId: string, activityId: string) => void;
  totalMiles: number;
  totalNights: number;
}

const PersonCard: React.FC<PersonCardProps> = ({
  person,
  onDeletePerson,
  onAddActivityClick,
  onDeleteActivity,
  totalMiles,
  totalNights,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{person.name}</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => onAddActivityClick(person.id)}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => onDeletePerson(person.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Total Hiking Miles:</p>
          <span className="text-lg font-bold">{totalMiles}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Total Camping Nights:</p>
          <span className="text-lg font-bold">{totalNights}</span>
        </div>

        <Separator className="my-2" />

        <CardDescription className="text-md font-semibold">Activities:</CardDescription>
        {person.activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center">No activities logged yet.</p>
        ) : (
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {person.activities
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
              .map((activity) => (
                <div key={activity.id} className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    {activity.type === "hiking" ? (
                      <Mountain className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Tent className="h-4 w-4 text-green-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {activity.location} ({format(new Date(activity.date), "MMM dd, yyyy")})
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.type === "hiking"
                          ? `${activity.miles || 0} miles`
                          : `${activity.nights || 0} nights`}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteActivity(person.id, activity.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonCard;