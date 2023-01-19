import { IProfile } from "../../types/database";
import GraphScreen from "../spotify/pie/GraphScreen";
import UsersTopArtists from "../spotify/UsersTopArtists";

export default function SpotifyData({ profile }: { profile: IProfile | null }) {
  if (!profile) {
    return null;
  }
  // @ts-ignore
  const { spotify_data: { items = [] } = [] } = profile;

  return (
    <>
      <div>
        <strong>Top Artists:</strong>
        <UsersTopArtists items={items} />
      </div>
      <div>
        <GraphScreen artists={items} />
      </div>
    </>
  );
}
