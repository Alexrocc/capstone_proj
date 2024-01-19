export interface AuthData {
  accessToken: string;
  user: {
    id?: number;
    email: string;
    name: string;
    surname: string;
    username: string;
    wishlist: object[];
    library: object[];
    terms: boolean;
  };
}

export interface User {
  id?: number;
  email: string | null;
  name: string | null;
  surname: string | null;
  username: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  wishlist: Steam[];
  library: Steam[];
  terms: boolean | null;
}

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
