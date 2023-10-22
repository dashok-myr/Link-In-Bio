import { useContext, useState } from "react";
import { UserContext } from "./context/UserProvider.tsx";
import { useNavigate } from "react-router-dom";
import Links from "./Links.tsx";

export default function Preview() {
  const [isCopied, setIsCopied] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  async function copyLink() {
    const currentURL = window.location.href;
    await navigator.clipboard.writeText(currentURL);
  }

  function showAndHideCopiedSvelte() {
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, "2000");
  }

  return (
    <div className="h-screen relative">
      <div className="flex flex-col items-center bg-purple h-96 rounded-b-3xl p-5">
        <div className="flex justify-between w-full p-5 rounded-lg bg-dark-lighter">
          <button
            onClick={() => navigate("/")}
            className="bg-transparent hover:bg-purple-light text-purple font-semibold py-2 px-4 border border-purple hover:border-transparent rounded-lg"
          >
            Back to Editor
          </button>
          <button
            onClick={() => {
              copyLink();
              showAndHideCopiedSvelte();
            }}
            className="relative bg-purple text-white hover:bg-purple-light hover:text-purple font-semibold py-2 px-4 border border-purple hover:border-transparent rounded-lg"
          >
            Share Link
            {(isCopied && (
              <div className="flex left-16 justify-center items-center absolute h-5 w-16 rounded-lg bg-purple-med text-purple text-xs">
                Copied!
              </div>
            )) ||
              ""}
          </button>
        </div>

        <div className="absolute flex justify-center mt-40 items-center bg-white h-[500px] w-[310px] rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div>image</div>
              <div className="flex gap-1 text-2xl font-semibold">
                <span>{user?.firstName}</span>
                <span>{user?.lastName}</span>
              </div>
              <div className="text-dark-med text-sm">{user?.email}</div>
            </div>
            <div className="mt-10">
              <Links />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
