export interface HikePhoto {
  id: string;
  dataUrl: string;
  caption: string;
  uploadedAt: string;
}

export interface Hike {
  id: string;
  trailName: string;
  location: string;
  miles: number;
  date: string;
  notes: string;
  photos: HikePhoto[];
  createdAt: string;
}

export interface CampingTrip {
  id: string;
  name: string;
  location: string;
  nights: number;
  date: string;
  notes: string;
  photos: HikePhoto[];
  createdAt: string;
}
