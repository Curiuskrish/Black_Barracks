import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { MatchCardProps } from '../types'; // adjust if needed

interface Team {
  name: string;
  logo: string;
  color: string;
  score?: string;
}

interface Match {
  id: number;
  team1: Team;
  team2: Team;
  date: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  result?: string;
}

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const matchDate = new Date(match.date);
  const isToday = new Date().toDateString() === matchDate.toDateString();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-500/10 transition-shadow border border-slate-700 hover:border-amber-500/30">
      {/* Status indicator */}
      <div
        className={`flex justify-between items-center px-4 py-2 text-xs font-medium
        ${
          match.status === 'live'
            ? 'bg-red-600 text-white'
            : match.status === 'upcoming'
            ? 'bg-amber-500 text-slate-900'
            : 'bg-slate-700 text-gray-200'
        }`}
      >
        <span>
          {match.status === 'live'
            ? 'LIVE'
            : match.status === 'upcoming'
            ? 'UPCOMING'
            : 'COMPLETED'}
        </span>
        {isToday && match.status === 'upcoming' && (
          <span className="bg-white text-amber-600 px-2 py-0.5 rounded-full text-xs">
            TODAY
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          {/* Team 1 */}
          <div className="flex flex-col items-center text-center w-2/5">
            <div
              className={`w-16 h-16 ${match.team1.color} rounded-full flex items-center justify-center mb-2`}
            >
              <img
                src={match.team1.logo}
                alt={`${match.team1.name} logo`}
                className="w-22 h-20  object-contain"
              />
            </div>
            <h3 className="text-white font-medium">{match.team1.name}</h3>
            {match.team1.score && (
              <p className="text-amber-500 font-semibold mt-1">
                {match.team1.score}
              </p>
            )}
          </div>

          {/* VS */}
          <div className="w-1/5 flex flex-col items-center">
            <span className="text-gray-400 text-sm">VS</span>
            {match.status === 'live' && (
              <div className="flex items-center mt-2 relative">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </div>
            )}
          </div>

          {/* Team 2 */}
          <div className="flex flex-col items-center text-center w-2/5">
            <div
              className={`w-16 h-16 ${match.team2.color} rounded-full flex items-center justify-center mb-2`}
            >
              <img
                src={match.team2.logo}
                alt={`${match.team2.name} logo`}
                className="w-26 h-26 object-contain"
              />
            </div>
            <h3 className="text-white font-medium">{match.team2.name}</h3>
            {match.team2.score && (
              <p className="text-amber-500 font-semibold mt-1">
                {match.team2.score}
              </p>
            )}
          </div>
        </div>

        {/* Match Result */}
        {match.status === 'completed' && match.result && (
          <div className="bg-slate-700/50 rounded-md p-2 text-center mb-4">
            <p className="text-amber-400 text-sm">{match.result}</p>
          </div>
        )}

        {/* Match Details */}
        <div className="border-t border-slate-700 pt-4 text-sm text-gray-400 space-y-2">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-amber-500" />
            <span>{formatDate(matchDate)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-amber-500" />
            <span>{formatTime(matchDate)} IST</span>
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-amber-500" />
            <span>{match.venue}</span>
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="px-6 py-3 bg-slate-700/50">
        <button className="w-full py-2 text-center text-amber-500 hover:text-amber-400 font-medium transition-colors text-sm">
          {match.status === 'upcoming'
            ? 'Match Details'
            : match.status === 'live'
            ? 'Watch Live Commentary'
            : 'View Highlights'}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
