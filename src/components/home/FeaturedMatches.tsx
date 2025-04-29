import React from 'react';
import { CalendarClock, Trophy } from 'lucide-react';
import MatchCard from './MatchCard';

const upcomingMatches = [
  {
    id: 1,
    team1: {
      name: 'Delhi Capitals',
      logo: 'https://i.pinimg.com/736x/a4/87/26/a48726809d1115236c20842dc781ae55.jpg',
      color: 'bg-blue-500',
    },
    team2: {
      name: 'Kolkata Knight Riders',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRTg7I3YkLAMH4SjqPsdnEazFVUlz1-Ng_4A&s',
      color: 'bg-purple-700',
    },
    date: '2025-04-29T19:30:00',
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'upcoming',
  },
  {
    id: 2,
    team1: {
      name: 'Chennai Super Kings',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG8MRZn2qFzNBkqxlJGRPG05V2ms-lMyMdgw&s',
      color: 'bg-yellow-500',
    },
    team2: {
      name: 'Punjab Kings',
      logo: 'https://wallpapers.com/images/hd/red-punjab-kings-shield-logo-usjp70lo2s93cymu.jpg',
      color: 'bg-red-500',
    },
    date: '2025-04-30T19:30:00',
    venue: 'MA Chidambaram Stadium, Chennai',
    status: 'upcoming',
  },
  {
    id: 3,
    team1: {
      name: 'Rajasthan Royals',
      logo: 'https://mrwallpaper.com/images/hd/rajasthan-royals-pink-background-pq1ac3zfrvq4wy4f.jpg',
      color: 'bg-pink-600',
    },
    team2: {
      name: 'Mumbai Indians',
      logo: 'https://i.pinimg.com/736x/28/09/a8/2809a841bb08827603ccac5c6aee8b33.jpg',
      color: 'bg-blue-600',
    },
    date: '2025-05-01T19:30:00',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    status: 'upcoming',
  },
];

const recentMatches = [
  {
    id: 4,
    team1: {
      name: 'Rajasthan Royals',
      logo: 'https://mrwallpaper.com/images/hd/rajasthan-royals-pink-background-pq1ac3zfrvq4wy4f.jpg',
      color: 'bg-pink-600',
      score: '212/2',
    },
    team2: {
      name: 'Gujarat Titans',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtBvKnFx-Z2WjTYt5_EAEceQK6hpZq3Zdarg&s',
      color: 'bg-teal-600',
      score: '209/4',
    },
    result: 'Rajasthan Royals won by 8 wickets',
    date: '2025-04-28T19:30:00',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    status: 'completed',
  },
  {
    id: 5,
    team1: {
      name: 'Delhi Capitals',
      logo: 'https://i.pinimg.com/736x/a4/87/26/a48726809d1115236c20842dc781ae55.jpg',
      color: 'bg-blue-500',
      score: '175/6',
    },
    team2: {
      name: 'Royal Challengers Bengaluru',
      logo: 'https://i.pinimg.com/736x/e5/8f/b0/e58fb0dc39ac13dc7719716e46a2ed35.jpg',
      color: 'bg-red-600',
      score: '178/4',
    },
    result: 'Royal Challengers Bengaluru won by 6 wickets',
    date: '2025-04-27T19:30:00',
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'completed',
  },
];

const FeaturedMatches = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10"
          data-aos="fade-up"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Featured Matches
            </h2>
            <p className="text-gray-400">
              Stay updated with the latest and upcoming IPL action
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button className="flex items-center px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-600 transition-colors text-slate-900 font-medium">
              <CalendarClock size={18} className="mr-2" />
              Full Schedule
            </button>
            <a
              href="https://www.google.com/search?q=ipl+points+table"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-md border border-amber-500 text-amber-500 hover:bg-amber-500/10 transition-colors font-medium"
            >
              <Trophy size={18} className="mr-2" />
              Points Table
            </a>
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="mb-10">
          <h3
            className="text-xl font-semibold text-amber-500 mb-6"
            data-aos="fade-right"
          >
            Upcoming Matches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match, index) => (
              <div
                key={match.id}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div>
          <h3
            className="text-xl font-semibold text-amber-500 mb-6"
            data-aos="fade-right"
          >
            Recent Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentMatches.map((match, index) => (
              <div
                key={match.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMatches;
