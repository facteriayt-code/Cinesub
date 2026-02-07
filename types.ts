
export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  duration?: string;
  seasons?: number;
  type: 'movie' | 'tv';
  genres: string[];
  description: string;
  posterUrl: string;
  backdropUrl: string;
  director: string;
  cast: string[];
  aiScore?: number;
  aiInsight?: string;
}

export type Category = 'All' | 'Trending' | 'Action' | 'Sci-Fi' | 'Drama' | 'Comedy' | 'Animation' | 'Documentary' | 'Thriller' | 'Horror';
