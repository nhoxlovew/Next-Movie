type MovieType = "series" | "single";

export interface Movie {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: MovieType; // "series" or "single"
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  time: string;
  quality: string;
  lang: string;
  year: number;
  category?: { id: string; name: string; slug: string }[];
  content?: string;
  imdb_rating?: number;
}
