import ProfileDetailsEditor from "./ProfileDetailsEditor.tsx";
import UserInfoProvider from "../context/UserInfoProvider.tsx";
import Preview from "../LinksBody/Preview.tsx";

export default function ProfileDetailsBody() {
  return (
    <UserInfoProvider>
      <div className="flex items-center gap-8 w-full my-5 pt-5 bg-white rounded-lg">
        <div className="basis-[600px]">
          <Preview />
        </div>
        <div className="flex-grow">
          <ProfileDetailsEditor />
        </div>
      </div>
    </UserInfoProvider>
  );
}
