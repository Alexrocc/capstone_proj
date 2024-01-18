export interface Steam {
  name: string;
  release_date: string;
  rating: number;
  price: number | null;
  genres: string[];
  description: string;
  reviews: number;
  image: string;
  video_src: string;
  id: string;
}
