import ProfileImageEditor from "./ProfileImageEditor.tsx";
import ProfileUserInfo from "./ProfileUserInfo.tsx";
import { useContext } from "react";
import { UserInfoContext } from "../context/UserInfoProvider.tsx";

export default function ProfileDetailsEditor() {
  const { userInfo, setName, setLastName, setEmail, setImage } =
    useContext(UserInfoContext);

  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl text-dark font-semibold">Profile Details</div>
      <div className="text-sm text-dark-med">
        Add your details to create a personal touch to your profile.
      </div>
      <ProfileImageEditor image={userInfo.image} onImageChange={setImage} />
      <ProfileUserInfo
        onNameChange={setName}
        userName={userInfo.userName}
        onLastNameChange={setLastName}
        userLastName={userInfo.userLastName}
        onEmailChange={setEmail}
        userEmail={userInfo.userEmail}
      />
    </div>
  );
}
