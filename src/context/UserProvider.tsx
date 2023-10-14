import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from "../firebase/firebase.tsx";

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
    return onAuthStateChangedListener((user: IUser | null) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      setUser(user);
      console.log(user);
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
