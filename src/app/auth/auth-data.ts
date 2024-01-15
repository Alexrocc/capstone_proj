export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    surname: string;
    username: string;
    wishlist: object[];
    library: object[];
    terms: boolean;
  };
}
