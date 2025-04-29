import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Award, Clock, Trophy } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import SkeletonLoader from '../components/common/SkeletonLoader';

// Mock performance data
const mockPerformanceData = [
  { match: 'MI vs CSK', runs: 82, sr: 158.3 },
  { match: 'MI vs RCB', runs: 45, sr: 145.2 },
  { match: 'MI vs KKR', runs: 98, sr: 168.9 },
  { match: 'MI vs DC', runs: 34, sr: 121.4 },
  { match: 'MI vs PBKS', runs: 76, sr: 152.0 },
];

const PlayerStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStat, setSelectedStat] = useState('recent');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const statTabs = [
    { id: 'recent', label: 'Performance Trends', icon: TrendingUp },
    { id: 'career', label: 'Career Stats', icon: Trophy },
    { id: 'records', label: 'Records', icon: Award },
    { id: 'history', label: 'Match History', icon: Clock },
  ];

  const renderMainContent = () => {
    if (isLoading) return <SkeletonLoader className="h-64" />;

    switch (selectedStat) {
      case 'career':
        return (
          <>
            <h3 className="text-xl font-semibold text-white mb-6">
              Career Statistics
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-300">
                <thead>
                  <tr className="bg-slate-700 text-left">
                    <th className="py-3 px-4">Format</th>
                    <th className="py-3 px-4">Matches</th>
                    <th className="py-3 px-4">Runs</th>
                    <th className="py-3 px-4">Average</th>
                    <th className="py-3 px-4">Strike Rate</th>
                    <th className="py-3 px-4">100s</th>
                    <th className="py-3 px-4">50s</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      format: 'IPL',
                      matches: 245,
                      runs: 8245,
                      average: 45.32,
                      strikeRate: 148.65,
                      hundreds: 8,
                      fifties: 62,
                    },
                    {
                      format: 'T20I',
                      matches: 95,
                      runs: 2850,
                      average: 39.5,
                      strikeRate: 142.3,
                      hundreds: 2,
                      fifties: 21,
                    },
                    {
                      format: 'ODI',
                      matches: 110,
                      runs: 4200,
                      average: 47.7,
                      strikeRate: 91.2,
                      hundreds: 10,
                      fifties: 35,
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-600 hover:bg-slate-700/50"
                    >
                      <td className="py-2 px-4">{row.format}</td>
                      <td className="py-2 px-4">{row.matches}</td>
                      <td className="py-2 px-4">{row.runs}</td>
                      <td className="py-2 px-4">{row.average}</td>
                      <td className="py-2 px-4">{row.strikeRate}</td>
                      <td className="py-2 px-4">{row.hundreds}</td>
                      <td className="py-2 px-4">{row.fifties}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      case 'records':
        return (
          <>
            <h3 className="text-xl font-semibold text-white mb-6">
              AI-Powered Career Highlights
            </h3>
            <ul className="space-y-4">
              {[
                { title: 'Most Valuable Player (AI Index)', value: '91.7/100' },
                { title: 'Peak Match Impact Score', value: '88 (vs KKR)' },
                { title: 'Consistency Rating', value: '87%' },
                {
                  title: 'Venue Dominance: Wankhede',
                  value: 'Avg: 59.3, SR: 165.2',
                },
                { title: 'Best Against: CSK', value: 'Avg: 72.4, 5x 50+' },
              ].map((record, idx) => (
                <li key={idx} className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">{record.title}</div>
                  <div className="text-2xl font-semibold text-amber-500">
                    {record.value}
                  </div>
                </li>
              ))}
            </ul>
          </>
        );
      case 'history':
        return (
          <>
            <h3 className="text-xl font-semibold text-white mb-6">
              Match-by-Match Logs
            </h3>
            <div className="space-y-4">
              {[
                {
                  opponent: 'vs CSK',
                  score: '82 (48)',
                  result: 'Won by 6 wickets',
                },
                {
                  opponent: 'vs RCB',
                  score: '45 (30)',
                  result: 'Lost by 10 runs',
                },
                {
                  opponent: 'vs KKR',
                  score: '98 (55)',
                  result: 'Won by 4 runs',
                },
                { opponent: 'vs DC', score: '34 (25)', result: 'No result' },
              ].map((match, idx) => (
                <div key={idx} className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">{match.opponent}</div>
                  <div className="text-lg text-white font-semibold">
                    {match.score}
                  </div>
                  <div className="text-sm text-emerald-400">{match.result}</div>
                </div>
              ))}
            </div>
          </>
        );
      case 'recent':
      default:
        return (
          <>
            <h3 className="text-xl font-semibold text-white mb-6">
              Performance Trends (AI Analysis)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="match" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="runs"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sr"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={{ fill: '#38bdf8' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        );
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Player Statistics & AI Insights
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Dive deep into comprehensive player statistics, performance
            analytics, and career highlights powered by AI insights.
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg shadow-lg mb-8 border border-slate-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search players..."
                className="w-full bg-slate-900 text-white rounded-md py-2 px-4 pl-10 border border-slate-600 focus:border-amber-500 focus:outline-none"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <button className="flex items-center justify-center px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition-colors">
              <Filter size={18} className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStat(tab.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedStat === tab.id
                  ? 'bg-amber-500 border-amber-600 text-slate-900'
                  : 'bg-slate-800 border-slate-700 text-gray-300 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-center justify-center">
                <tab.icon size={20} className="mr-2" />
                <span className="font-medium">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
            {renderMainContent()}
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-6">
              AI Quick Summary
            </h3>
            {isLoading ? (
              <div className="space-y-4">
                <SkeletonLoader className="h-12" count={4} />
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { label: 'Win Impact (%)', value: '73%' },
                  { label: 'Consistency Score', value: '88/100' },
                  { label: 'Average Match Rating', value: '8.4/10' },
                  { label: 'Dominant Venue', value: 'Wankhede Stadium' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-700/50 rounded-lg p-4"
                  >
                    <div className="text-gray-400 text-sm mb-1">
                      {stat.label}
                    </div>
                    <div className="text-2xl font-semibold text-amber-500">
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
