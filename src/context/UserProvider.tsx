import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  getOrCreateFirebaseUser,
  onAuthStateChangedListener,
} from "../firebase/firebase.tsx";

export interface IAuthUser {
  uid: string;
  email: string;
  createdAt: Date;
}

export interface IUser {
  uid: string;
  email: string;
  createdAt: Date;
  firstName: string | undefined;
  lastName: string | undefined;
  profileUrl: File | null;
}

export const UserContext = createContext<{
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setImage: (image: File) => void;
}>({
  user: null,
  setUser: () => {},
  setName: () => {},
  setLastName: () => {},
  setEmail: () => {},
  setImage: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    return onAuthStateChangedListener(async (authUser: IAuthUser | null) => {
      const isLoggedOut = authUser === null;
      if (isLoggedOut) {
        setUser(null);
        return;
      }

      const userData = await getOrCreateFirebaseUser(authUser);
      setUser(userData);
    });
  }, []);

  function setName(firstName: string) {
    if (!user) return;

    const copy = { ...user, firstName: firstName };
    setUser(copy);
  }

  function setLastName(lastName: string) {
    if (!user) return;
    const copy = { ...user, lastName: lastName };
    setUser(copy);
  }

  function setEmail(email: string) {
    if (!user) return null;
    const copy = { ...user, email: email };
    setUser(copy);
  }

  function setImage(image: File) {
    if (!user) return null;
    setUser({ ...user, profileUrl: image });
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, setName, setLastName, setEmail, setImage }}
    >
      {children}
    </UserContext.Provider>
  );
};
