import Image from "next/image";
import { AiFillPlusCircle } from "react-icons/ai";
import {
  IUploadPhotoModalValues,
  useUploadPhotoModal,
} from "../../../providers/uploadPhotoModalProvider";
import placeholder from "../../../public/placeholder_img.jpeg";

export default function ProfilePhotoInput({
  photoUrl,
  idx,
}: {
  photoUrl: string | null;
  idx: number;
}) {
  const [, setModalValues] = useUploadPhotoModal();

  const onImageClick = (e: any) => {
    const modalValues: IUploadPhotoModalValues = {
      isOpen: true,
      indexOfPhoto: idx,
    };
    if (photoUrl !== null) {
      modalValues.photoUrl = photoUrl;
    }

    setModalValues(modalValues);
  };

  return (
    <div
      className={`mx-1 rounded-md cursor-pointer relative ${
        !photoUrl ? "border-dashed border-2 border-slate-200" : ""
      }`}
      onClick={onImageClick}
    >
      <Image
        className={!photoUrl ? "opacity-40 hover:opacity-100" : ""}
        src={photoUrl || placeholder}
        alt={`profile photo ${idx}`}
        width={100}
        height={150}
      />
      {!photoUrl && (
        <div className="text-red-500 text-[20px] absolute right-0 -bottom-2">
          <AiFillPlusCircle />
        </div>
      )}
    </div>
  );
}
