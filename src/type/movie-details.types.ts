export interface MovieDetailResponse {
  status: boolean;
  msg: string;
  movie: Movie;
  episodes: Server[];
}

export interface Movie {
  tmdb: {
    type: string;
    id: string;
    season: number;
    vote_average: number;
    vote_count: number;
  };
  imdb?: {
    id: string | null;
  };
  created: {
    time: string;
  };
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  poster_url: string;
  thumb_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  country: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export interface Episode {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface Server {
  server_name: string;
  server_data: Episode[];
}

export interface MovieData {
  status: boolean;
  msg: string;
  movie: Movie;
  episodes: Server[];
}