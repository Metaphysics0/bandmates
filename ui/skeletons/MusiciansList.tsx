import ProfileCardSkeleton from "./ProfileCard";

export default function MusiciansListSkeleton({ qty = 10 }: { qty?: number }) {
  return (
    <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-[calc(100%-2rem)] justify-center mx-auto">
      {new Array(qty).fill("_").map((idx) => (
        <ProfileCardSkeleton key={idx} />
      ))}
    </div>
  );
}
