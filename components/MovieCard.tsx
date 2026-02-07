
import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      className="group relative flex flex-col gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-2"
      onClick={() => onClick(movie)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-zinc-800 shadow-xl group-hover:border-purple-500/50 group-hover:shadow-purple-500/10">
        <img 
          src={movie.posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-purple-600 text-[10px] font-bold rounded uppercase tracking-wider text-white">AI {movie.aiScore}%</span>
            <span className="text-[10px] text-zinc-300 font-medium">{movie.year}</span>
          </div>
          <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors">
            View Details
          </button>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-[10px] font-bold text-white">{movie.rating}</span>
        </div>
      </div>
      
      <div className="px-1">
        <h3 className="text-sm font-bold text-zinc-100 line-clamp-1 group-hover:text-purple-400 transition-colors">{movie.title}</h3>
        <p className="text-[11px] text-zinc-500 font-medium">{movie.genres.slice(0, 2).join(' • ')}</p>
      </div>
    </div>
  );
};

export default MovieCard;
