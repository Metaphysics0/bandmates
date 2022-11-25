import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../types/db";

const createServerClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

export default createServerClient;
