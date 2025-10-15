import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Activity } from "@/hooks/usePeopleTracker";

interface AddActivityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddActivity: (activity: Omit<Activity, "id">) => void;
}

const AddActivityForm: React.FC<AddActivityFormProps> = ({
  isOpen,
  onClose,
  onAddActivity,
}) => {
  const [activityType, setActivityType] = useState<"hiking" | "camping">("hiking");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [location, setLocation] = useState("");
  const [miles, setMiles] = useState<number | string>("");
  const [nights, setNights] = useState<number | string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !location.trim()) {
      // You might want to add a toast notification here for validation
      return;
    }

    const newActivity: Omit<Activity, "id"> = {
      type: activityType,
      date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      location: location.trim(),
    };

    if (activityType === "hiking") {
      newActivity.miles = typeof miles === 'string' ? parseFloat(miles) : miles;
    } else {
      newActivity.nights = typeof nights === 'string' ? parseFloat(nights) : nights;
    }

    onAddActivity(newActivity);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setActivityType("hiking");
    setDate(new Date());
    setLocation("");
    setMiles("");
    setNights("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && (resetForm(), onClose())}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
          <DialogDescription>
            Add a new hiking or camping activity for this person.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="activityType" className="text-right">
              Type
            </Label>
            <RadioGroup
              defaultValue="hiking"
              value={activityType}
              onValueChange={(value: "hiking" | "camping") => setActivityType(value)}
              className="flex items-center space-x-4 col-span-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hiking" id="hiking" />
                <Label htmlFor="hiking">Hiking</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="camping" id="camping" />
                <Label htmlFor="camping">Camping</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal col-span-3",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="col-span-3"
              required
            />
          </div>

          {activityType === "hiking" ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="miles" className="text-right">
                Miles
              </Label>
              <Input
                id="miles"
                type="number"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
                className="col-span-3"
                min="0"
                required
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nights" className="text-right">
                Nights
              </Label>
              <Input
                id="nights"
                type="number"
                value={nights}
                onChange={(e) => setNights(e.target.value)}
                className="col-span-3"
                min="0"
                required
              />
            </div>
          )}
          <DialogFooter>
            <Button type="submit">Add Activity</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddActivityForm;