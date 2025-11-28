import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://chbyizexfgolrwmshxpb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYnlpemV4ZmdvbHJ3bXNoeHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDA3MzIsImV4cCI6MjA3OTgxNjczMn0.Ti_ecQeN-7Zw50HQLm95063b1azFwPrvi7UmokqM5fY';

export const supabase = createClient(supabaseUrl, supabaseKey);