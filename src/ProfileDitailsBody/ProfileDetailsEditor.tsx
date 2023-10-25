import ProfileImageEditor from "./ProfileImageEditor.tsx";
import ProfileUserInfo from "./ProfileUserInfo.tsx";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider.tsx";
import saved from "../assets/icon-changes-saved.svg";
import { NotificationContext } from "../context/NotificationProvider.tsx";

export default function ProfileDetailsEditor() {
  const {
    user,
    setName,
    setLastName,
    setEmail,
    setImage,
    saveFirebaseUserInfo,
  } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);

  const [isError, setIsError] = useState(false);

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
        isError={isError}
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
      <div className="flex justify-end mt-5">
        <button
          onClick={() => {
            if (user?.firstName === "" || user?.lastName === "") {
              setIsError(true);
              return;
            }
            saveFirebaseUserInfo(user?.uid);
            setNotification({
              icon: saved,
              label: "Your changes were saved!",
              isDisplayed: true,
            });
          }}
          className="bg-purple-light hover:bg-purple-med text-purple font-semibold py-2 px-5 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}
