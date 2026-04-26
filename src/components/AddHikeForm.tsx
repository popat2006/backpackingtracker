import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "./ImageUpload";
import { Hike, HikePhoto } from "@/types/hike";
import { v4 as uuidv4 } from "uuid";

interface AddHikeFormProps {
  open: boolean;
  onClose: () => void;
  onAdd: (hike: Hike) => void;
}

const AddHikeForm = ({ open, onClose, onAdd }: AddHikeFormProps) => {
  const [trailName, setTrailName] = useState("");
  const [location, setLocation] = useState("");
  const [miles, setMiles] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<HikePhoto[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trailName.trim() || !location.trim() || !miles) return;

    const hike: Hike = {
      id: uuidv4(),
      trailName: trailName.trim(),
      location: location.trim(),
      miles: parseFloat(miles),
      date,
      notes,
      photos,
      createdAt: new Date().toISOString(),
    };
    onAdd(hike);

    setTrailName("");
    setLocation("");
    setMiles("");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
    setPhotos([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a Hike</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trailName">Trail Name</Label>
            <Input id="trailName" value={trailName} onChange={(e) => setTrailName(e.target.value)} placeholder="e.g. Appalachian Trail" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Great Smoky Mountains, TN" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="miles">Miles</Label>
              <Input id="miles" type="number" step="0.1" min="0" value={miles} onChange={(e) => setMiles(e.target.value)} placeholder="5.2" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Trail conditions, highlights..." />
          </div>
          <div className="space-y-2">
            <Label>Photos</Label>
            <ImageUpload photos={photos} onChange={setPhotos} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Hike</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHikeForm;
