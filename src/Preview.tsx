import { useContext } from "react";
import { UserContext } from "./context/UserProvider.tsx";
import { useNavigate } from "react-router-dom";
import Links from "./Links.tsx";
import clipboard from "../src/assets/icon-link-copied-to-clipboard.svg";
import { NotificationContext } from "./context/NotificationProvider.tsx";

export default function Preview() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { setNotification } = useContext(NotificationContext);

  async function copyLink() {
    const currentURL = window.location.href;
    await navigator.clipboard.writeText(currentURL);
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative flex flex-col">
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
                setNotification({
                  icon: clipboard,
                  label: "This link has been copied to your clipboard!",
                  isDisplayed: true,
                });
              }}
              className="relative bg-purple text-white hover:bg-purple-light hover:text-purple font-semibold py-2 px-4 border border-purple hover:border-transparent rounded-lg"
            >
              Share Link
            </button>
          </div>

          <div className="absolute flex justify-center mt-40 items-center bg-white h-[500px] w-[310px] rounded-3xl shadow-2xl">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <img
                  className="object-cover rounded-full w-32 h-32"
                  src={user.profileUrl || ""}
                  alt="profile image"
                />
                <div className="flex gap-1 text-2xl font-semibold">
                  <span>{user.firstName}</span>
                  <span>{user.lastName}</span>
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
    </div>
  );
}
