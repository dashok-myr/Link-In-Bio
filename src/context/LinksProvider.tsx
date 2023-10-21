import React, { createContext, ReactNode, useContext, useState } from "react";
import { IPlatform } from "../LinksBody/SOCIAL_MEDIA_PLATFORMS.ts";
import { updateFirebaseLink } from "../firebase/firebase.tsx";
import { UserContext } from "./UserProvider.tsx";

export interface ILink {
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
  const { user } = useContext(UserContext);

  function addNewLink() {
    setLinks([...links, { platform: null, url: "" }]);
  }

  function removeLink(index: number) {
    const copyLink = [...links];
    copyLink.splice(index, 1);
    setLinks(copyLink);
  }

  function setLinkPlatform(platform: IPlatform, index: number) {
    if (!user) return;

    const copyLink = [...links];
    copyLink[index].platform = platform;
    setLinks(copyLink);
    const linkData = { links: copyLink };
    updateFirebaseLink(user.uid, linkData);
  }

  function setLinkUrl(url: string, index: number) {
    if (!user) return;

    const copyLink = [...links];
    copyLink[index].url = url;
    setLinks(copyLink);
    const linkData = { links: copyLink };
    updateFirebaseLink(user.uid, linkData);
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
