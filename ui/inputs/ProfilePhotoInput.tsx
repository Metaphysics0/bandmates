import Image from "next/image";

export default function ProfilePhotoInput({ photoUrl }: { photoUrl: string }) {
  return (
    <div>
      <Image src={photoUrl} alt={""} />
    </div>
  );
}
