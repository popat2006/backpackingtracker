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
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Activity } from "@/hooks/usePeopleTracker";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox

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
  const [isHiking, setIsHiking] = useState(true); // Default to hiking selected
  const [isCamping, setIsCamping] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [location, setLocation] = useState("");
  const [miles, setMiles] = useState<number | string>("");
  const [nights, setNights] = useState<number | string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !location.trim() || (!isHiking && !isCamping)) {
      // You might want to add a toast notification here for validation
      return;
    }

    const newActivity: Omit<Activity, "id"> = {
      type: isHiking ? "hiking" : "camping", // Default type if both or neither are selected
      date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      location: location.trim(),
      miles: isHiking && typeof miles === 'string' && miles.trim() !== '' ? parseFloat(miles) : 0,
      nights: isCamping && typeof nights === 'string' && nights.trim() !== '' ? parseFloat(nights) : 0,
    };

    onAddActivity(newActivity);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setIsHiking(true);
    setIsCamping(false);
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
            <div className="flex items-center space-x-4 col-span-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isHiking"
                  checked={isHiking}
                  onCheckedChange={(checked) => setIsHiking(!!checked)}
                />
                <Label htmlFor="isHiking">Hiking</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isCamping"
                  checked={isCamping}
                  onCheckedChange={(checked) => setIsCamping(!!checked)}
                />
                <Label htmlFor="isCamping">Camping</Label>
              </div>
            </div>
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

          {isHiking && (
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
              />
            </div>
          )}

          {isCamping && (
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