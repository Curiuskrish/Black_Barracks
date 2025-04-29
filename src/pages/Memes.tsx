// File: src/pages/Memes.tsx

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ThumbsUp,
  MessageCircle,
  Share2,
  Upload,
  Filter,
} from 'lucide-react';
import SkeletonLoader from '../components/common/SkeletonLoader';

// Mock data for memes
const memes = [
  {
    id: 1,
    imageUrl: 'https://media4.giphy.com/media/WJ8Rnhyg67u3kjYKfy/giphy.gif?cid=6c09b952c013aj65smqrnzpdgcg7gn782lgil18pvgljrwak&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    caption: 'When you finally hit your first six 🏏',
    likes: 2453,
    comments: 89,
    author: 'cricket_lover',
    timestamp: '2h ago',
    tags: ['#IPL', '#Cricket', '#Funny'],
  },
  {
    id: 2,
    imageUrl: 'https://media.tenor.com/Y7ShQ_3hnn8AAAAM/me-waiting-for-my-friends-to-get-online.gif',
    caption: 'That moment when the third umpire takes forever 😅',
    likes: 1832,
    comments: 45,
    author: 'meme_master',
    timestamp: '5h ago',
    tags: ['#ThirdUmpire', '#WaitingGame'],
  },
  {
    id: 3,
    imageUrl: 'https://i.pinimg.com/originals/b2/28/13/b228138ca189b63989d295492e8a8b16.gif',
    caption: 'Me calculating required run rate after every dot ball 📉',
    likes: 3120,
    comments: 150,
    author: 'math_in_cricket',
    timestamp: '1d ago',
    tags: ['#RequiredRunRate', '#Stress'],
  },
  {
    id: 4,
    imageUrl: 'https://img.wattpad.com/b10ffbb6b0eec83d0fb0c220e36987213249b0ce/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f39645148585a554e304754376b413d3d2d3431393538323130302e3134633362653832643830316231393732373236313039353930342e676966',
    caption:
      "Captain asking field placement like it's a Marvel strategy meeting 🧠🛡️",
    likes: 2078,
    comments: 67,
    author: 'strategist_11',
    timestamp: '3h ago',
    tags: ['#CaptainCool', '#AvengersAssemble'],
  },
  {
    id: 5,
    imageUrl: 'https://media.tenor.com/M5lhi9aS8tgAAAAM/umm-ill-pretend-i-didnt-see-that.gif',
    caption: 'When the fielder pretends he didn’t touch the rope 🫣',
    likes: 2750,
    comments: 132,
    author: 'boundary_bluff',
    timestamp: '7h ago',
    tags: ['#CaughtOrNot', '#VARNeeded'],
  },
  {
    id: 6,
    imageUrl: 'https://media4.giphy.com/media/Fz9EKXRhp9F1S/giphy.gif?cid=6c09b952fyhs8mwnxx6rwn54lsdxzdq40cp276igzm26ii3r&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    caption:
      "When the bowler appeals for LBW and even grandma at home knows it's not out 🧓😂",
    likes: 1980,
    comments: 98,
    author: 'umpire_unplugged',
    timestamp: '10h ago',
    tags: ['#NotOutBro', '#DesperateAppeal'],
  },
];

const Memes = () => {
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('trending');

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Cricket Meme Central 🧢
          </h1>
          <p className="text-gray-400 max-w-2xl">
            The ultimate collection of cricket memes. Laugh harder than the
            bowler who just got hit for 6 sixes!
          </p>
        </div>

        {/* Controls */}
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg mb-8 border border-slate-700">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setFilter('trending')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  filter === 'trending'
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <TrendingUp size={18} className="mr-2" />
                Trending
              </button>
              <button
                onClick={() => setFilter('latest')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  filter === 'latest'
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Filter size={18} className="mr-2" />
                Latest
              </button>
            </div>
            <button className="px-4 py-2 bg-amber-500 text-slate-900 rounded-md hover:bg-amber-600 transition-colors flex items-center">
              <Upload size={18} className="mr-2" />
              Upload Meme
            </button>
          </div>
        </div>

        {/* Meme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [...Array(6)].map((_, i) => (
                <SkeletonLoader key={i} className="h-96 rounded-lg" />
              ))
            : memes.map((meme) => (
                <motion.div
                  key={meme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-amber-500/30 transition-all"
                >
                  <div className="relative aspect-square">
                    <img
                      src={meme.imageUrl}
                      alt={`Meme: ${meme.caption}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-white mb-3">{meme.caption}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {meme.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm text-amber-500 hover:text-amber-400 cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-gray-400 text-sm">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center hover:text-amber-500 transition-colors">
                          <ThumbsUp size={18} className="mr-1" />
                          {meme.likes}
                        </button>
                        <button className="flex items-center hover:text-amber-500 transition-colors">
                          <MessageCircle size={18} className="mr-1" />
                          {meme.comments}
                        </button>
                        <button className="flex items-center hover:text-amber-500 transition-colors">
                          <Share2 size={18} />
                        </button>
                      </div>
                      <span>{meme.timestamp}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Memes;
