import { MAX_PROFILE_PHOTO_LENGTH } from "../../../data/consts";
import { IProfile } from "../../../types/database";
import ProfilePhotoInput from "./ProfilePhotoInput";

export default function ProfilePhotos({
  profile,
}: {
  profile: IProfile | null;
}) {
  const defaultNullArray = Array(MAX_PROFILE_PHOTO_LENGTH).fill(null);
  const initializeProfilePhotos = (): (string | null)[] => {
    if (!profile) return defaultNullArray;

    const { profile_photos } = profile;

    if (profile_photos === null || profile_photos?.length === 0) {
      return defaultNullArray;
    }

    if (profile_photos.length < 5) {
      return [
        ...profile_photos,
        ...Array(MAX_PROFILE_PHOTO_LENGTH - profile_photos.length).fill(null),
      ];
    }

    return profile_photos;
  };

  const profilePhotos = initializeProfilePhotos();

  return (
    <div className="flex items-center justify-center">
      {profilePhotos.map((photoUrl, idx) => (
        <ProfilePhotoInput photoUrl={photoUrl} key={idx} idx={idx} />
      ))}
    </div>
  );
}
