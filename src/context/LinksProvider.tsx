import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IPlatform } from "../LinksBody/SOCIAL_MEDIA_PLATFORMS.ts";
import {
  getFirebaseLinksDocument,
  updateFirebaseLinkDocument,
} from "../firebase/firebase.tsx";
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
  saveFireBaseLinks: () => void;
}>({
  links: [],
  setLinks: () => {},
  addNewLink: () => {},
  removeLink: () => {},
  setLinkPlatform: () => {},
  setLinkUrl: () => {},
  saveFireBaseLinks: () => {},
});

export default function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<ILink[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function loadFirebaseLinks() {
      if (!user) return;
      const data = await getFirebaseLinksDocument(user?.uid);
      setLinks(data?.links || []);
    }
    loadFirebaseLinks();
  }, [user, user?.uid]);

  function addNewLink() {
    setLinks([...links, { platform: null, url: "" }]);
  }

  function removeLink(index: number) {
    if (!user) return;

    const linksCopy = [...links];
    linksCopy.splice(index, 1);
    setLinks(linksCopy);
    updateFirebaseLinkDocument(user.uid, { links: linksCopy });
  }

  function setLinkPlatform(platform: IPlatform, index: number) {
    if (!user) return;

    const copyLink = [...links];
    copyLink[index].platform = platform;
    setLinks(copyLink);
  }

  function setLinkUrl(url: string, index: number) {
    if (!user) return;

    const copyLink = [...links];
    copyLink[index].url = url;
    setLinks(copyLink);
  }

  function saveFireBaseLinks() {
    if (!user) return;

    updateFirebaseLinkDocument(user.uid, { links: links });
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
        saveFireBaseLinks,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}
