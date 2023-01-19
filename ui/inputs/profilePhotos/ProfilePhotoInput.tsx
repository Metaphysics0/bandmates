import Image from "next/image";
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
    <div className="mx-1 rounded-md cursor-pointer" onClick={onImageClick}>
      <Image
        className="rounded-md"
        src={photoUrl || placeholder}
        alt={`profile photo ${idx}`}
        width={100}
        height={150}
      />
    </div>
  );
}
