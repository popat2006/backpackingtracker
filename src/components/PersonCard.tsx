import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Person } from "@/hooks/usePeopleTracker";

interface PersonCardProps {
  person: Person;
  onUpdateMiles: (id: string, delta: number) => void;
  onUpdateNights: (id: string, delta: number) => void;
  onDeletePerson: (id: string) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({
  person,
  onUpdateMiles,
  onUpdateNights,
  onDeletePerson,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{person.name}</CardTitle>
        <Button variant="destructive" size="icon" onClick={() => onDeletePerson(person.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Hiking Miles:</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => onUpdateMiles(person.id, -1)}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-bold w-10 text-center">{person.miles}</span>
            <Button variant="outline" size="icon" onClick={() => onUpdateMiles(person.id, 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Camping Nights:</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => onUpdateNights(person.id, -1)}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-bold w-10 text-center">{person.nights}</span>
            <Button variant="outline" size="icon" onClick={() => onUpdateNights(person.id, 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonCard;