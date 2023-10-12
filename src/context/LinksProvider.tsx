import React, { createContext, ReactNode, useState } from "react";
import { IPlatform } from "../LinksBody/SOCIAL_MEDIA_PLATFORMS.ts";

interface ILink {
  platform: IPlatform | null;
  url: string;
}

export const LinksContext = createContext<{
  links: ILink[];
  setLinks: React.Dispatch<React.SetStateAction<ILink[]>>;
  addNewLink: () => void;
  removeLink: (index: number) => void;
  setLinkPlatform: (platform: IPlatform, index: number) => void;
  setLinkUrl: (url: string, index: number) => void;
}>({
  links: [],
  setLinks: () => {},
  addNewLink: () => {},
  removeLink: () => {},
  setLinkPlatform: () => {},
  setLinkUrl: () => {},
});

export default function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<ILink[]>([]);

  function addNewLink() {
    setLinks([...links, { platform: null, url: "" }]);
  }

  function removeLink(index: number) {
    const copyLink = [...links];
    copyLink.splice(index, 1);
    setLinks(copyLink);
  }

  function setLinkPlatform(platform: IPlatform, index: number) {
    const copyLink = [...links];
    copyLink[index].platform = platform;
    setLinks(copyLink);
  }

  function setLinkUrl(url: string, index: number) {
    const copyLink = [...links];
    copyLink[index].url = url;
    setLinks(copyLink);
  }

  return (
    <LinksContext.Provider
      value={{
        links,
        setLinks,
        addNewLink,
        removeLink,
        setLinkPlatform,
        setLinkUrl,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}
