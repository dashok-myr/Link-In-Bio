import ProfileImageEditor from "./ProfileImageEditor.tsx";
import ProfileUserInfo from "./ProfileUserInfo.tsx";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider.tsx";

export default function ProfileDetailsEditor() {
  const { user, setName, setLastName, setEmail, setImage } =
    useContext(UserContext);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl text-dark font-semibold">Profile Details</div>
      <div className="text-sm text-dark-med">
        Add your details to create a personal touch to your profile.
      </div>
      <ProfileImageEditor
        profileUrl={user.profileUrl}
        onImageChange={(file) => {
          setImage(file);
        }}
      />
      <ProfileUserInfo
        onNameChange={(e) => {
          setName(e.target.value);
        }}
        firstName={user.firstName}
        onLastNameChange={(e) => {
          setLastName(e.target.value);
        }}
        lastName={user.lastName}
        onEmailChange={(e) => {
          setEmail(e.target.value);
        }}
        email={user.email}
      />
    </div>
  );
}
