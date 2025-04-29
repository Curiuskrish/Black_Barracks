/*
  # Cricket Data Schema

  1. New Tables
    - `players`
      - `id` (uuid, primary key)
      - `player_id` (text, unique) - Cricket Data API ID
      - `name` (text)
      - `team` (text)
      - `role` (text)
      - `batting_style` (text)
      - `bowling_style` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `matches`
      - `id` (uuid, primary key) 
      - `match_id` (text, unique) - Cricket Data API ID
      - `team1` (text)
      - `team2` (text)
      - `venue` (text)
      - `date` (timestamptz)
      - `result` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `player_stats`
      - `id` (uuid, primary key)
      - `player_id` (uuid, references players)
      - `match_id` (uuid, references matches)
      - `runs` (integer)
      - `balls` (integer)
      - `fours` (integer)
      - `sixes` (integer)
      - `strike_rate` (numeric)
      - `wickets` (integer)
      - `economy` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id text UNIQUE NOT NULL,
  name text NOT NULL,
  team text,
  role text,
  batting_style text,
  bowling_style text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id text UNIQUE NOT NULL,
  team1 text NOT NULL,
  team2 text NOT NULL,
  venue text,
  date timestamptz NOT NULL,
  result text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create player_stats table
CREATE TABLE IF NOT EXISTS player_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id) ON DELETE CASCADE,
  match_id uuid REFERENCES matches(id) ON DELETE CASCADE,
  runs integer DEFAULT 0,
  balls integer DEFAULT 0,
  fours integer DEFAULT 0,
  sixes integer DEFAULT 0,
  strike_rate numeric DEFAULT 0,
  wickets integer DEFAULT 0,
  economy numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to players"
  ON players
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to matches"
  ON matches
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to player_stats"
  ON player_stats
  FOR SELECT
  TO public
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_players_updated_at
  BEFORE UPDATE ON players
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_matches_updated_at
  BEFORE UPDATE ON matches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_player_stats_updated_at
  BEFORE UPDATE ON player_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();