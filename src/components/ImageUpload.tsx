import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, ImagePlus } from "lucide-react";
import { HikePhoto } from "@/types/hike";
import { v4 as uuidv4 } from "uuid";

interface ImageUploadProps {
  photos: HikePhoto[];
  onChange: (photos: HikePhoto[]) => void;
  maxPhotos?: number;
}

const ImageUpload = ({ photos, onChange, maxPhotos = 10 }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (photos.length >= maxPhotos) return;
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        const newPhoto: HikePhoto = {
          id: uuidv4(),
          dataUrl,
          caption: "",
          uploadedAt: new Date().toISOString(),
        };
        onChange([...photos, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    onChange(photos.filter((p) => p.id !== id));
  };

  const updateCaption = (id: string, caption: string) => {
    onChange(photos.map((p) => (p.id === id ? { ...p, caption } : p)));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group w-24 h-24 rounded-lg overflow-hidden border">
            <img src={photo.dataUrl} alt={photo.caption || "Photo"} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removePhoto(photo.id)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
            <input
              type="text"
              placeholder="Caption..."
              value={photo.caption}
              onChange={(e) => updateCaption(photo.id, e.target.value)}
              className="absolute bottom-0 left-0 right-0 text-[10px] bg-black/60 text-white border-none p-1 focus:outline-none"
            />
          </div>
        ))}
        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 hover:border-blue-400 transition-colors"
          >
            <ImagePlus className="w-6 h-6 text-gray-400" />
            <span className="text-[10px] text-gray-400">Add Photo</span>
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
      <p className="text-xs text-gray-500">{photos.length}/{maxPhotos} photos</p>
    </div>
  );
};

export default ImageUpload;
