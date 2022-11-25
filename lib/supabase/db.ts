import supabase from "./supbase-browser";

export const getMusicians = async (loggedInUserId?: string) => {
  const baseCriteria = supabase
    .from("profiles")
    .select(`*, musical_instrument(*)`);

  if (loggedInUserId) {
    return await baseCriteria.not("id", "eq", loggedInUserId);
  }

  return await baseCriteria;
};

export const getUser = async (userId: string) =>
  await supabase.from("profiles").select("*").eq(userId, true);
