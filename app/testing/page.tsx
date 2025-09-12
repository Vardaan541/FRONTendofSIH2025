import { createClient } from '@/lib/supabase/server';

// A page to verify that supabase is connected
export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("alumni_leaderboard").select();

  return <pre>{JSON.stringify(instruments, null, 2)}</pre>
}