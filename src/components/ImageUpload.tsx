import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ImagePlus, Loader2 } from "lucide-react";
import { HikePhoto } from "@/types/hike";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  photos: HikePhoto[];
  onChange: (photos: HikePhoto[]) => void;
  maxPhotos?: number;
  hikeId?: string;
  campingTripId?: string;
}

const ImageUpload = ({ photos, onChange, maxPhotos = 10, hikeId, campingTripId }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const uploadToSupabase = async (file: File): Promise<HikePhoto | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error } = await supabase.storage
      .from('hike-photos')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data } = supabase.storage
      .from('hike-photos')
      .getPublicUrl(filePath);

    return {
      id: uuidv4(),
      dataUrl: data.publicUrl,
      caption: '',
      uploadedAt: new Date().toISOString(),
    };
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      if (photos.length >= maxPhotos) break;
      if (!file.type.startsWith("image/")) continue;

      const photo = await uploadToSupabase(file);
      if (photo) {
        onChange([...photos, photo]);
      }
    }
    setUploading(false);
    e.target.value = "";
  };

  const removePhoto = async (id: string) => {
    const photo = photos.find(p => p.id === id);
    if (photo) {
      // Extract file path from URL and delete from storage
      try {
        const url = new URL(photo.dataUrl);
        const path = url.pathname.split('/hike-photos/')[1];
        if (path) {
          await supabase.storage.from('hike-photos').remove([path]);
        }
      } catch {
        // Ignore URL parsing errors for old base64 photos
      }
      onChange(photos.filter(p => p.id !== id));
    }
  };

  const updateCaption = (id: string, caption: string) => {
    onChange(photos.map(p => (p.id === id ? { ...p, caption } : p)));
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
            disabled={uploading}
            className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 hover:border-blue-400 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            ) : (
              <>
                <ImagePlus className="w-6 h-6 text-gray-400" />
                <span className="text-[10px] text-gray-400">Add Photo</span>
              </>
            )}
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
      <p className="text-xs text-gray-500">{photos.length}/{maxPhotos} photos</p>
    </div>
  );
};

export default ImageUpload;
