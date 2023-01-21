import Image from "next/image";
import { AiFillPlusCircle } from "react-icons/ai";
import placeholder from "../../../public/placeholder_img.jpeg";

export default function ProfilePhotoInput({
  photoUrl,
  idx,
}: {
  photoUrl: string | null;
  idx: number;
}) {
  const onImageClick = (e: any) => {
    console.log("AHHH", idx);
  };

  return (
    <div
      className="mx-1 rounded-md cursor-pointer border-dashed border-2 border-slate-200 relative"
      onClick={onImageClick}
    >
      <Image
        className="opacity-40 hover:opacity-100"
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
