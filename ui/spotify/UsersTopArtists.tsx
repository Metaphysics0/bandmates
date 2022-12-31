import { ITopSpotifyArtist } from "../../types/database";

export default function UsersTopArtists({
  items,
}: {
  items: ITopSpotifyArtist[];
}) {
  return (
    <div>
      <pre>{JSON.stringify(items[0], null, 2)}</pre>
    </div>
  );
}
