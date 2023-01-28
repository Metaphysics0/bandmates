import Image from "next/image";
import { ITopSpotifyArtist } from "../../types/database";

const TOP_ARTIST_SHOW_LIMIT = 5;

export default function UsersTopArtists({
  items,
}: {
  items: ITopSpotifyArtist[];
}) {
  return (
    <div className="flex">
      {items.slice(0, TOP_ARTIST_SHOW_LIMIT).map(ArtistItem)}
    </div>
  );
}

const ArtistItem = (artist: ITopSpotifyArtist, idx: number) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        className="max-h-24"
        src={artist.images[0].url}
        alt={artist.name}
        width={100}
        height={100}
      />
      <div>
        <strong>
          {idx + 1}. {artist.name}
        </strong>
      </div>
    </div>
  );
};
