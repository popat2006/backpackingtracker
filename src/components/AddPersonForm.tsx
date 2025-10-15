import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface AddPersonFormProps {
  onAddPerson: (name: string) => void;
}

const AddPersonForm: React.FC<AddPersonFormProps> = ({ onAddPerson }) => {
  const [personName, setPersonName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (personName.trim()) {
      onAddPerson(personName);
      setPersonName("");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Person</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="personName">Person's Name</Label>
            <Input
              id="personName"
              type="text"
              placeholder="e.g., Alice"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Person
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPersonForm;