import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  getOrCreateFirebaseUserDocument,
  onAuthStateChangedListener,
  updateFirebaseUserDocument,
  uploadFirebaseImage,
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
  profileUrl: string | null;
}

export const UserContext = createContext<{
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setImage: (image: File) => void;
  saveFirebaseUserInfo: (uid: string) => void;
}>({
  user: null,
  setUser: () => {},
  setName: () => {},
  setLastName: () => {},
  setEmail: () => {},
  setImage: () => {},
  saveFirebaseUserInfo: () => {},
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

      const userData = await getOrCreateFirebaseUserDocument(authUser);
      setUser(userData);
    });
  }, []);

  function setName(firstName: string) {
    if (!user) return;

    setUser({ ...user, firstName: firstName });
    // updateFirebaseUserDocument(user.uid, { firstName: firstName });
  }

  function setLastName(lastName: string) {
    if (!user) return;
    setUser({ ...user, lastName: lastName });
    // updateFirebaseUserDocument(user.uid, { lastName: lastName });
  }

  function setEmail(email: string) {
    if (!user) return null;
    setUser({ ...user, email: email });
    updateFirebaseUserDocument(user.uid, { email: email });
  }

  async function setImage(imageFile: File) {
    if (!user) return null;
    const imageUrl = await uploadFirebaseImage(
      `profile_image_1_${user.uid}`,
      imageFile
    );
    setUser({ ...user, profileUrl: imageUrl });
    updateFirebaseUserDocument(user.uid, { profileUrl: imageUrl });
  }

  function saveFirebaseUserInfo(uid: string) {
    updateFirebaseUserDocument(uid, { ...user });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setName,
        setLastName,
        setEmail,
        setImage,
        saveFirebaseUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
