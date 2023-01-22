import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";
import { MAX_PROFILE_PHOTO_LENGTH } from "../../../data/consts";
import { IProfile } from "../../../types/database";
import ProfilePhotoInput from "./ProfilePhotoInput";

export default function ProfilePhotos({
  profile,
  isForProfileModal = false,
  setActiveProfilePhotoForModal,
}: {
  profile: IProfile | null;
  isForProfileModal: boolean;
  setActiveProfilePhotoForModal?: Dispatch<
    SetStateAction<string | StaticImageData>
  >;
}) {
  const profilePhotos = initializeProfilePhotos(profile, isForProfileModal);

  return (
    <div className="flex flex-wrap items-center justify-center mt-5">
      {profilePhotos.map((photoUrl, idx) => {
        return isForProfileModal && setActiveProfilePhotoForModal ? (
          <Image
            className="cursor-pointer"
            key={idx}
            src={photoUrl || ""}
            alt={`profile photo ${idx}`}
            width={100}
            height={150}
            onClick={() => setActiveProfilePhotoForModal(photoUrl || "")}
          />
        ) : (
          <ProfilePhotoInput photoUrl={photoUrl} key={idx} idx={idx} />
        );
      })}
    </div>
  );
}

const initializeProfilePhotos = (
  profile: IProfile | null,
  isForProfileModal: boolean
): (string | null)[] => {
  if (isForProfileModal) return profile?.profile_photos ?? [];

  const defaultNullArray = Array(MAX_PROFILE_PHOTO_LENGTH).fill(null);
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
