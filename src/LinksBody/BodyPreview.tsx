import { useContext } from "react";
import { UserContext } from "../context/UserProvider.tsx";
import Links from "../Links.tsx";

export function PreviewLinkSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-lg bg-gray-100 w-52 h-10" />
      <div className="rounded-lg bg-gray-100 w-52 h-10" />
      <div className="rounded-lg bg-gray-100 w-52 h-10" />
      <div className="rounded-lg bg-gray-100 w-52 h-10" />
      <div className="rounded-lg bg-gray-100 w-52 h-10" />
    </div>
  );
}

export default function BodyPreview() {
  const { user } = useContext(UserContext);

  if (!user) return null;

  return (
    <div className="flex justify-center items-center min-h-[500px]">
      <div className="mx-auto border-gray-800 dark:border-gray-800 border rounded-[2.5rem] h-[580px] w-[280px]">
        <div className="mt-2.5 mx-auto border-gray-800 dark:border-gray-800 border rounded-[2rem] h-[560px] w-[260px]">
          <div className="flex flex-col justify-center items-center m-6">
            {user.profileUrl ? (
              <img
                className="object-cover rounded-full bg-gray-100 w-28 h-28"
                src={user.profileUrl}
                alt="profileImg"
              />
            ) : (
              <div className="rounded-full bg-gray-100 w-28 h-28 mb-6" />
            )}
            {user.firstName ? (
              <div className="flex flex-col items-center gap-2 my-6">
                <div className="flex gap-1 font-medium">
                  <span>{user.firstName}</span>
                  <span>{user.lastName}</span>
                </div>
                <span className="text-sm text-dark-med">{user.email}</span>
              </div>
            ) : (
              <>
                <div className="rounded-lg bg-gray-100 w-36 h-4 mb-3" />
                <div className="rounded-lg bg-gray-100 w-20 h-2 mb-10" />
              </>
            )}
            <Links />
          </div>
        </div>
      </div>
    </div>
  );
}
