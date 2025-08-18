export interface MovieItem {
  _id: string;
  name: string;
  slug: string;
  year: string;
  episode_current: string;
  quality: string;
  poster_url?: string;
  thumb_url?: string;
}

export interface ApiGenreResponse {
  status: boolean | string;
  msg: string;
  data: {
    titlePage: string;
    items: MovieItem[];
    params: {
      pagination: {
        currentPage: number;
        totalPages: number;
      };
    };
    APP_DOMAIN_CDN_IMAGE?: string;
  };
}
