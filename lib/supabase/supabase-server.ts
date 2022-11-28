import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../types/database";

const supabaseServer = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

export default supabaseServer;
