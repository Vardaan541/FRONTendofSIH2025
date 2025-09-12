import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
  );
}

/**
 * Client-side helper to fetch table rows.
 * queryFn should return the supabase query result (awaited), e.g.:
 *   q => q.select('*').eq('id', userId)
 */
export async function getTableDataClient<T>(
  tableName: string,
  queryFn: (query: any) => any = (q) => q.select("*")
): Promise<T[]> {
  const supabase = createClient();
  const query = supabase.from(tableName);
  const result = await queryFn(query); // expected { data, error }
  const data = result?.data ?? [];
  const error = result?.error ?? null;
  if (error) throw error;
  return data as T[];
}
