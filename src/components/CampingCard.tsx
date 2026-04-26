import { X, MapPin, Moon, Calendar, ChevronDown, ChevronUp, Camera } from "lucide-react";
import { useState } from "react";
import { CampingTrip } from "@/types/hike";

interface CampingCardProps {
  trip: CampingTrip;
  onDelete: (id: string) => void;
}

const CampingCard = ({ trip, onDelete }: CampingCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm space-y-2">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{trip.name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {trip.location}
            </span>
            <span className="flex items-center gap-1">
              <Moon className="w-3.5 h-3.5" /> {trip.nights} night{trip.nights !== 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {new Date(trip.date).toLocaleDateString()}
            </span>
          </div>
        </div>
        <button onClick={() => onDelete(trip.id)} className="text-red-500 hover:text-red-700 p-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      {trip.notes && (
        <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{trip.notes}"</p>
      )}

      {trip.photos.length > 0 && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400"
          >
            <Camera className="w-3.5 h-3.5" />
            {trip.photos.length} photo{trip.photos.length !== 1 ? "s" : ""}
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {expanded && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {trip.photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img src={photo.dataUrl} alt={photo.caption || trip.name} className="w-full h-20 object-cover rounded" />
                  {photo.caption && (
                    <p className="text-[10px] text-gray-600 mt-0.5 truncate">{photo.caption}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CampingCard;
