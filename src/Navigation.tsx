import classNames from "classnames";
import { useLocation } from "react-router-dom";

interface INavBarProp {
  onLinksClick: () => void;
  onProfileClick: () => void;
}

export default function Navigation({
  onLinksClick,
  onProfileClick,
}: INavBarProp) {
  const location = useLocation();

  return (
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
        <button className="bg-transparent hover:bg-purple-light text-purple font-semibold py-2 px-4 border border-purple hover:border-transparent rounded-lg">
          Preview
        </button>
      </div>
    </div>
  );
}