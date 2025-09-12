import { createClient } from "@/lib/supabase/server";

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;

export async function getTableData<T>(
  tableName: string,
  queryFn: (query: any) => any
): Promise<T[]> {
  const supabase = await createClient();
  const query = supabase.from(tableName);
  const { data, error } = await queryFn(query);

  return data as T[];
}
