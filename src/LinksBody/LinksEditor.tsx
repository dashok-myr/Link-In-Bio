import empty from "../assets/illustration-empty.svg";
import { Link } from "./Link.tsx";
import { LinksContext } from "../context/LinksProvider.tsx";
import { useContext } from "react";
import { PLATFORM_INFO } from "./PLATFORM_INFO.ts";

export function LinksEditor() {
  const { links, addNewLink, removeLink, setLinkPlatform, setLinkUrl } =
    useContext(LinksContext);

  return (
    <div className="p-7 h-screen overflow-y-auto">
      <div className="text-xl text-dark font-semibold">
        Customize your links
      </div>
      <div className="text-sm text-dark-med py-4">
        Add/edit/remove links below and them share all your profiles with the
        world!
      </div>
      <button
        onClick={addNewLink}
        className="bg-transparent hover:bg-purple-light text-purple font-semibold py-2 w-full border border-purple hover:border-transparent rounded-xl"
      >
        + Add new link
      </button>
      {links.length > 0 ? (
        <div className="my-5">
          {links.map((link, index) => {
            return (
              <Link
                key={index}
                selectedDropdownOption={
                  link.platform ? PLATFORM_INFO[link.platform].label : "Options"
                }
                url={link.url}
                linkNumber={index + 1}
                onRemoveClick={() => removeLink(index)}
                onAddPlatformClick={(platform) => {
                  setLinkPlatform(platform, index);
                }}
                onUrlChange={(e) => {
                  setLinkUrl(e.target.value, index);
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center h-80 justify-center bg-dark-lighter mt-7 rounded-xl">
          <img src={empty} alt="empty" />
        </div>
      )}
      <div className="flex justify-end mt-5">
        <button className="bg-purple-light hover:bg-purple-med text-purple font-semibold py-2 px-5 rounded-lg">
          Save
        </button>
      </div>
    </div>
  );
}
