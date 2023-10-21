import ProfileDetailsEditor from "./ProfileDetailsEditor.tsx";
import BodyPreview from "../LinksBody/BodyPreview.tsx";

export default function ProfileDetailsBody() {
  return (
    <div className="flex items-center gap-8 w-full my-5 pt-5 bg-white rounded-lg">
      <div className="basis-[600px]">
        <BodyPreview />
      </div>
      <div className="flex-grow">
        <ProfileDetailsEditor />
      </div>
    </div>
  );
}
