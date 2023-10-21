import { useContext } from "react";
import { UserContext } from "./context/UserProvider.tsx";

export default function Preview() {
  const { user } = useContext(UserContext);
  return (
    <div className="h-screen relative">
      <div className="flex flex-col items-center bg-purple h-96 rounded-b-3xl p-5">
        <div className="flex justify-between w-full p-5 rounded-lg bg-dark-lighter">
          <button className="bg-transparent hover:bg-purple-light text-purple font-semibold py-2 px-4 border border-purple hover:border-transparent rounded-lg">
            Back to Editor
          </button>
          <button className="bg-purple text-white hover:bg-purple-light hover:text-purple font-semibold py-2 px-4 border border-purple hover:border-transparent rounded-lg">
            Share Link
          </button>
        </div>

        <div className="absolute flex justify-center mt-40 items-center bg-white h-[500px] w-[350px] rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div>image</div>
              <div className="flex gap-1 text-2xl font-semibold">
                <span>{user?.firstName}</span>
                <span>{user?.lastName}</span>
              </div>
              <div className="text-dark-med text-sm">{user?.email}</div>
            </div>
            <div>links</div>
          </div>
        </div>
      </div>
    </div>
  );
}