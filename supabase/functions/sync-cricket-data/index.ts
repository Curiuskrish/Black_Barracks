import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const cricketApiUrl = Deno.env.get('CRICKET_API_URL');
    const cricketApiKey = Deno.env.get('CRICKET_API_KEY');

    // Fetch and sync data from Cricket API
    const response = await fetch(`${cricketApiUrl}/players`, {
      headers: {
        'Authorization': `Bearer ${cricketApiKey}`,
      },
    });

    const players = await response.json();

    // Update Supabase database
    const { data, error } = await supabaseClient
      .from('players')
      .upsert(players);

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});