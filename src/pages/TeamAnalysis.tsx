import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import SkeletonLoader from '../components/common/SkeletonLoader';

import {
  Search,
  Filter,
  Users,
  Trophy,
  TrendingUp,
  Zap,
  Shield,
  Swords,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

// Dynamic Mock Data per team
const teamDataMap = {
  MI: {
    strength: [
      { subject: 'Batting', A: 130, fullMark: 150 },
      { subject: 'Bowling', A: 100, fullMark: 150 },
      { subject: 'Fielding', A: 90, fullMark: 150 },
      { subject: 'Strategy', A: 95, fullMark: 150 },
      { subject: 'Experience', A: 100, fullMark: 150 },
      { subject: 'Form', A: 85, fullMark: 150 },
    ],
    winDist: [
      { name: 'Home Wins', value: 40 },
      { name: 'Away Wins', value: 30 },
      { name: 'Home Losses', value: 10 },
      { name: 'Away Losses', value: 20 },
    ],
    predictions: {
      winProbability: 72,
      qualificationChance: 80,
    },
  },
  CSK: {
    strength: [
      { subject: 'Batting', A: 110, fullMark: 150 },
      { subject: 'Bowling', A: 130, fullMark: 150 },
      { subject: 'Fielding', A: 95, fullMark: 150 },
      { subject: 'Strategy', A: 120, fullMark: 150 },
      { subject: 'Experience', A: 110, fullMark: 150 },
      { subject: 'Form', A: 75, fullMark: 150 },
    ],
    winDist: [
      { name: 'Home Wins', value: 38 },
      { name: 'Away Wins', value: 28 },
      { name: 'Home Losses', value: 14 },
      { name: 'Away Losses', value: 20 },
    ],
    predictions: {
      winProbability: 66,
      qualificationChance: 78,
    },
  },
  RCB: {
    strength: [
      { subject: 'Batting', A: 140, fullMark: 150 },
      { subject: 'Bowling', A: 85, fullMark: 150 },
      { subject: 'Fielding', A: 80, fullMark: 150 },
      { subject: 'Strategy', A: 90, fullMark: 150 },
      { subject: 'Experience', A: 70, fullMark: 150 },
      { subject: 'Form', A: 90, fullMark: 150 },
    ],
    winDist: [
      { name: 'Home Wins', value: 30 },
      { name: 'Away Wins', value: 22 },
      { name: 'Home Losses', value: 18 },
      { name: 'Away Losses', value: 25 },
    ],
    predictions: {
      winProbability: 58,
      qualificationChance: 65,
    },
  },
  KKR: {
    strength: [
      { subject: 'Batting', A: 100, fullMark: 150 },
      { subject: 'Bowling', A: 105, fullMark: 150 },
      { subject: 'Fielding', A: 100, fullMark: 150 },
      { subject: 'Strategy', A: 105, fullMark: 150 },
      { subject: 'Experience', A: 95, fullMark: 150 },
      { subject: 'Form', A: 70, fullMark: 150 },
    ],
    winDist: [
      { name: 'Home Wins', value: 32 },
      { name: 'Away Wins', value: 25 },
      { name: 'Home Losses', value: 18 },
      { name: 'Away Losses', value: 22 },
    ],
    predictions: {
      winProbability: 62,
      qualificationChance: 70,
    },
  },
};

const COLORS = ['#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'];

const TeamAnalysis = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState('MI');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const team = teamDataMap[selectedTeam];

  const teams = [
    { id: 'MI', name: 'Mumbai Indians', color: 'bg-blue-600' },
    { id: 'CSK', name: 'Chennai Super Kings', color: 'bg-yellow-500' },
    { id: 'RCB', name: 'Royal Challengers', color: 'bg-red-600' },
    { id: 'KKR', name: 'Kolkata Knight Riders', color: 'bg-purple-700' },
  ];

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Team Analysis</h1>

        {/* Team Select */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(team.id)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedTeam === team.id
                  ? 'bg-amber-500 border-amber-600 text-slate-900'
                  : 'bg-slate-800 border-slate-700 text-gray-300 hover:border-amber-500'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 ${team.color} rounded-full text-white text-center leading-8 mr-3 font-bold`}
                >
                  {team.id}
                </div>
                {team.name}
              </div>
            </button>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <Shield className="mr-2 text-amber-500" /> Team Strengths
            </h2>
            {isLoading ? (
              <div className="animate-pulse h-64 bg-slate-700 rounded-lg" />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={team.strength}
                >
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                  <PolarRadiusAxis stroke="#94a3b8" />
                  <Radar
                    name="Strength"
                    dataKey="A"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Pie Chart */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <Trophy className="mr-2 text-amber-500" /> Win Distribution
            </h2>
            {isLoading ? (
              <div className="animate-pulse h-64 bg-slate-700 rounded-lg" />
            ) : (
              <>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={team.winDist}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {team.winDist.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {team.winDist.map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-center text-sm text-gray-400"
                    >
                      <span
                        className="w-3 h-3 rounded-full mr-2 inline-block"
                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                      />
                      {entry.name}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Predictions */}
        <div className="mt-10 bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold flex items-center mb-4">
            <Zap className="mr-2 text-amber-500" /> AI Predictions
          </h2>
          {isLoading ? (
            <div className="animate-pulse h-20 bg-slate-700 rounded-lg" />
          ) : (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-700/50 rounded-lg p-4"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Win Probability</span>
                  <span className="text-2xl font-bold text-amber-500">
                    {team.predictions.winProbability}%
                  </span>
                </div>
                <div className="w-full bg-slate-600 h-2 rounded-full">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${team.predictions.winProbability}%` }}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-700/50 rounded-lg p-4"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Qualification Chance</span>
                  <span className="text-2xl font-bold text-amber-500">
                    {team.predictions.qualificationChance}%
                  </span>
                </div>
                <div className="w-full bg-slate-600 h-2 rounded-full">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{
                      width: `${team.predictions.qualificationChance}%`,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamAnalysis;
