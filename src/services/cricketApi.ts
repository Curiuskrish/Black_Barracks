import axios from 'axios';
import { supabase } from '../lib/supabase';

const cricketApi = axios.create({
  baseURL: import.meta.env.VITE_CRICKET_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_CRICKET_API_KEY}`
  }
});

export const syncPlayers = async () => {
  try {
    // Fetch players from Cricket Data API
    const response = await cricketApi.get('/players');
    const players = response.data;

    // Insert or update players in Supabase
    const { data, error } = await supabase
      .from('players')
      .upsert(
        players.map((player: any) => ({
          player_id: player.id,
          name: player.name,
          team: player.team,
          role: player.role,
          batting_style: player.batting_style,
          bowling_style: player.bowling_style
        })),
        { onConflict: 'player_id' }
      );

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error syncing players:', error);
    throw error;
  }
};

export const syncMatches = async () => {
  try {
    // Fetch matches from Cricket Data API
    const response = await cricketApi.get('/matches');
    const matches = response.data;

    // Insert or update matches in Supabase
    const { data, error } = await supabase
      .from('matches')
      .upsert(
        matches.map((match: any) => ({
          match_id: match.id,
          team1: match.team1,
          team2: match.team2,
          venue: match.venue,
          date: match.date,
          result: match.result
        })),
        { onConflict: 'match_id' }
      );

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error syncing matches:', error);
    throw error;
  }
};

export const syncPlayerStats = async (matchId: string) => {
  try {
    // Fetch match stats from Cricket Data API
    const response = await cricketApi.get(`/matches/${matchId}/stats`);
    const stats = response.data;

    // Insert or update player stats in Supabase
    const { data, error } = await supabase
      .from('player_stats')
      .upsert(
        stats.map((stat: any) => ({
          player_id: stat.player_id,
          match_id: matchId,
          runs: stat.runs,
          balls: stat.balls,
          fours: stat.fours,
          sixes: stat.sixes,
          strike_rate: stat.strike_rate,
          wickets: stat.wickets,
          economy: stat.economy
        })),
        { onConflict: ['player_id', 'match_id'] }
      );

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error syncing player stats:', error);
    throw error;
  }
};