import { PLATFORM_INFO } from "./LinksBody/PLATFORM_INFO.ts";
import arrowRight from "./assets/arrow-right.svg";
import { PreviewLinkSkeleton } from "./LinksBody/BodyPreview.tsx";
import { useContext } from "react";
import { LinksContext } from "./context/LinksProvider.tsx";

export default function Links() {
  const { links } = useContext(LinksContext);

  return (
    <div>
      {links.length > 0 ? (
        links.map(({ platform }) => {
          if (platform === null) {
            return (
              <div
                key={platform}
                className="rounded-lg bg-gray-100 w-56 h-12"
              />
            );
          }

          const { color, icon, label } = PLATFORM_INFO[platform];

          return (
            <div
              key={platform}
              className="flex items-center gap-3 rounded-lg w-56 h-12 p-3 mb-5"
              style={{ backgroundColor: color }}
            >
              <img className="h-7" src={icon} alt="icon" />
              <div className="text-white">{label}</div>
              <div className="flex w-full justify-end">
                <img className="w-5" src={arrowRight} alt="icon" />
              </div>
            </div>
          );
        })
      ) : (
        <PreviewLinkSkeleton />
      )}
    </div>
  );
}
