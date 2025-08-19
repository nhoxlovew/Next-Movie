export interface ApiResponse {
  status: string;
  msg: string;
  items: MovieItem[];
  pagination?: {
    totalItems: number;
    totalItemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface CategoryApiResponse {
  status: string | boolean;
  msg: string;
  data: {
    seoOnPage: {
      og_type: string;
      titleHead: string;
      descriptionHead: string;
      og_image: string[];
      og_url: string;
    };
    breadCrumb: Array<{
      name: string;
      slug?: string;
      isCurrent: boolean;
      position: number;
    }>;
    titlePage: string;
    items: MovieItem[];
    params: {
      type_slug: string;
      filterCategory: string[];
      filterCountry: string[];
      filterYear: string[];
      filterType: string[];
      sortField: string;
      sortType: string;
      pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        totalPages: number;
      };
    };
    type_list: string;
    APP_DOMAIN_FRONTEND: string;
    APP_DOMAIN_CDN_IMAGE: string;
  };
}

export interface MovieListParams {
  page?: number;
  sort_field?: "time" | "name" | "year" | "view";
  sort_type?: "desc" | "asc";
  sort_lang?: "cn" | "en" | "kr" | "th";
  category?: string;
  country?: string;
  year?: number;
  limit?: number;
}

export interface FilterOption {
  id: string;
  name: string;
  slug: string;
}

export interface MovieItem {
  tmdb: Tmdb;
  imdb: Imdb;
  modified: Modified;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: string;
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: Category[];
  country: Country[];
}

export interface Tmdb {
  type: string;
  id: string;
  season: number;
  vote_average: number;
  vote_count: number;
}

export interface Imdb {
  id: string | null;
}

export interface Modified {
  time: string; // ISO date string
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

// Search API Types
export interface SearchParams {
  keyword: string;
  page?: number;
  sort_field?: "time" | "name" | "year" | "view";
  sort_type?: "desc" | "asc";
  sort_lang?: "cn" | "en" | "kr" | "th";
  category?: string;
  country?: string;
  year?: number;
  limit?: number;
}

export interface SearchApiResponse {
  status: boolean;
  msg: string;
  data?: {
    seoOnPage: {
      og_type: string;
      titleHead: string;
      descriptionHead: string;
      og_image: string[];
      og_url: string;
    };
    breadCrumb: Array<{
      name: string;
      slug?: string;
      isCurrent: boolean;
      position: number;
    }>;
    titlePage: string;
    items: MovieItem[];
    params: {
      type_slug: string;
      filterCategory: string[];
      filterCountry: string[];
      filterYear: string[];
      filterType: string[];
      sortField: string;
      sortType: string;
      pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        totalPages: number;
      };
    };
    type_list: string;
    APP_DOMAIN_FRONTEND: string;
    APP_DOMAIN_CDN_IMAGE: string;
  };
}



