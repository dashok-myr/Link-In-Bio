import React, { ChangeEvent, createContext, ReactNode, useState } from "react";

interface IUserInfo {
  userName: string;
  userLastName: string;
  userEmail: string;
  image: File | null;
}

export const UserInfoContext = createContext<{
  userInfo: IUserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
  setName: (e: ChangeEvent<HTMLInputElement>) => void;
  setLastName: (e: ChangeEvent<HTMLInputElement>) => void;
  setEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  setImage: (e: File) => void;
}>({
  userInfo: {
    userName: "",
    userLastName: "",
    userEmail: "",
    image: null,
  },
  setUserInfo: () => {},
  setName: () => {},
  setLastName: () => {},
  setEmail: () => {},
  setImage: () => {},
});

export default function UserInfoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    userName: "",
    userLastName: "",
    userEmail: "",
    image: null,
  });

  function setName(e: ChangeEvent<HTMLInputElement>) {
    const copy = { ...userInfo, userName: e.target.value };
    setUserInfo(copy);
  }
  function setLastName(e: ChangeEvent<HTMLInputElement>) {
    const copy = { ...userInfo, userLastName: e.target.value };
    setUserInfo(copy);
  }
  function setEmail(e: ChangeEvent<HTMLInputElement>) {
    const copy = { ...userInfo, userEmail: e.target.value };
    setUserInfo(copy);
  }

  function setImage(image: File) {
    setUserInfo({ ...userInfo, image: image });
  }

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
        setName,
        setLastName,
        setEmail,
        setImage,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}
