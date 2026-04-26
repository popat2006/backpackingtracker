import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "./ImageUpload";
import { CampingTrip, HikePhoto } from "@/types/hike";
import { v4 as uuidv4 } from "uuid";

interface AddCampingFormProps {
  open: boolean;
  onClose: () => void;
  onAdd: (trip: CampingTrip) => void;
}

const AddCampingForm = ({ open, onClose, onAdd }: AddCampingFormProps) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [nights, setNights] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<HikePhoto[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim() || !nights) return;

    const trip: CampingTrip = {
      id: uuidv4(),
      name: name.trim(),
      location: location.trim(),
      nights: parseInt(nights),
      date,
      notes,
      photos,
      createdAt: new Date().toISOString(),
    };
    onAdd(trip);

    setName("");
    setLocation("");
    setNights("");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
    setPhotos([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a Camping Trip</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Trip Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Spring Weekend" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Yosemite Valley, CA" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nights">Nights</Label>
              <Input id="nights" type="number" min="1" value={nights} onChange={(e) => setNights(e.target.value)} placeholder="2" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Campsite details, weather..." />
          </div>
          <div className="space-y-2">
            <Label>Photos</Label>
            <ImageUpload photos={photos} onChange={setPhotos} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Trip</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCampingForm;
