import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../types/db";

// do not cache this page
export const revalidate = 0;

export default async function ProfilePage() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  return (
    <div className="grid place-content-center h-48">
      <div>Profile Page</div>
    </div>
  );
}
