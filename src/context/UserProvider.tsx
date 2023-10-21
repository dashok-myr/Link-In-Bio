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
  updateFirebaseUser,
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

    setUser({ ...user, firstName: firstName });
    updateFirebaseUser(user.uid, { firstName: firstName });
  }

  function setLastName(lastName: string) {
    if (!user) return;
    setUser({ ...user, lastName: lastName });
    updateFirebaseUser(user.uid, { lastName: lastName });
  }

  function setEmail(email: string) {
    if (!user) return null;
    setUser({ ...user, email: email });
    updateFirebaseUser(user.uid, { email: email });
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
