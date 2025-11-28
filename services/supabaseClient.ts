import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://chbyizexfgolrwmshxpb.supabase.co';
const supabaseKey = 'sb_publishable_ilSrym7OxgJzL_kRB8qgvg_IkM9ks5Q';

export const supabase = createClient(supabaseUrl, supabaseKey);