import { FaGuitar } from "react-icons/fa";

export default function ProfileCardSkeleton() {
  return (
    <div
      role="status"
      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center bg-white p-3 rounded-lg shadow-lg flex flex-col justify-between"
    >
      <div className="flex justify-center items-center w-full h-52 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <FaGuitar className="w-12 h-12 text-gray-200" />
      </div>
      <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
