import classNames from "classnames";
import { Outlet, useLocation } from "react-router-dom";
import { UserContext } from "./context/UserProvider.tsx";
import { useContext } from "react";

interface INavBarProp {
  onLinksClick: () => void;
  onProfileClick: () => void;
  onSignOutBtn: () => void;
  onSignInBtn: () => void;
  onPreviewBtn: () => void;
}

export default function Navigation({
  onLinksClick,
  onProfileClick,
  onSignOutBtn,
  onSignInBtn,
  onPreviewBtn,
}: INavBarProp) {
  const location = useLocation();
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="p-3 bg-white rounded-lg">
        <div className="flex justify-between items-center">
          <div className="font-bold">LIB</div>
          <div className="flex items-center gap-8">
            <button
              onClick={onLinksClick}
              className={classNames("font-semibold py-2 px-5 rounded-lg", {
                "bg-purple-light hover:bg-purple-med text-purple":
                  location.pathname === "/",
                "hover:text-purple text-dark-med": location.pathname !== "/",
              })}
            >
              Links
            </button>
            <button
              onClick={onProfileClick}
              className={classNames("font-semibold py-2 px-5 rounded-lg", {
                "bg-purple-light hover:bg-purple-med text-purple":
                  location.pathname === "/profile",
                "hover:text-purple text-dark-med":
                  location.pathname !== "/profile",
              })}
            >
              Profile Details
            </button>
          </div>
          <div className="flex items-center gap-3">
            {!user?.email ? (
              <button
                onClick={onSignInBtn}
                className="font-medium text-purple hover:text-dark"
              >
                Sing In
              </button>
            ) : (
              <button
                onClick={onSignOutBtn}
                className="font-medium text-purple hover:text-dark"
              >
                Sing Out
              </button>
            )}
            <button
              onClick={onPreviewBtn}
              className="bg-transparent hover:bg-purple-light text-purple font-semibold py-2 px-4 border border-purple hover:border-transparent rounded-lg"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
