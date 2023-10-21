import { LinksEditor } from "./LinksEditor.tsx";
import BodyPreview from "./BodyPreview.tsx";

export default function LinksBody() {
  return (
    <div className="flex items-center gap-8 w-full my-5 pt-5 bg-white rounded-lg">
      <div className="basis-[600px]">
        <BodyPreview />
      </div>
      <div className="flex-grow">
        <LinksEditor />
      </div>
    </div>
  );
}
