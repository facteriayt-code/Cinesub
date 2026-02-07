
import React from 'react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onViewDetails: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onViewDetails }) => {
  return (
    <div className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={movie.backdropUrl} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-8 md:px-16 pb-20 max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-purple-600/90 text-xs font-black rounded text-white tracking-widest uppercase shadow-lg shadow-purple-600/20">
            Featured
          </span>
          <span className="text-zinc-400 text-sm font-medium">IMDB {movie.rating} • {movie.year}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
          {movie.title}
        </h1>
        
        <p className="text-lg text-zinc-300 mb-8 max-w-2xl leading-relaxed font-medium">
          {movie.description}
        </p>
        
        <div className="flex flex-wrap items-center gap-4">
          <button 
            className="px-8 py-4 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-zinc-200 transition-all transform hover:scale-105"
            onClick={() => onViewDetails(movie)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Watch Trailer
          </button>
          
          <button 
            className="px-8 py-4 bg-zinc-800/80 backdrop-blur-md text-white font-bold rounded-xl flex items-center gap-2 hover:bg-zinc-700 transition-all border border-zinc-700/50"
            onClick={() => onViewDetails(movie)}
          >
            View Details
          </button>

          <div className="flex flex-col ml-4">
            <span className="text-[10px] uppercase font-black tracking-widest text-purple-500 mb-1">AI Recommendation</span>
            <span className="text-sm font-bold text-white italic">"{movie.aiInsight}"</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
