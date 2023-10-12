import React, { useState } from "react";
import arrowDown from "../assets/arrow-down.svg";

import { IPlatform, SOCIAL_MEDIA_PLATFORMS } from "./SOCIAL_MEDIA_PLATFORMS.ts";

import { PLATFORM_INFO } from "./PLATFORM_INFO.ts";

const dropdownPlatforms = [
  SOCIAL_MEDIA_PLATFORMS.LINKEDIN,
  SOCIAL_MEDIA_PLATFORMS.GITHUB,
  SOCIAL_MEDIA_PLATFORMS.YOUTUBE,
  SOCIAL_MEDIA_PLATFORMS.FACEBOOK,
];

interface ILinkProps {
  linkNumber: number;
  onRemoveClick: () => void;
  onAddPlatformClick: (platform: IPlatform) => void;
  onUrlChange: React.ChangeEventHandler<HTMLInputElement>;
  url: string;
}

export function Link({
  linkNumber,
  onRemoveClick,
  onAddPlatformClick,
  onUrlChange,
  url,
}: ILinkProps) {
  const [selectedDropdownOption, setSelectedDropdownOption] =
    useState("Options");

  const [isDropdownDisplay, setIsDropdownDisplay] = useState(false);

  return (
    <div className="bg-dark-lighter rounded-lg p-5 mb-5">
      <div className="flex justify-between">
        <div className="font-semibold text-sm text-dark-med pb-3">
          Link #{linkNumber}
        </div>
        <button onClick={onRemoveClick} className="text-sm text-dark-med">
          remove
        </button>
      </div>
      <div className="relative text-left">
        <div className="text-xs text-dark-med pb-1">Platform</div>
        <div>
          <button
            onClick={() => setIsDropdownDisplay(!isDropdownDisplay)}
            type="button"
            className="relative flex w-full justify-start gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:shadow-md ring-1 ring-inset ring-gray-300 hover:ring-purple-med hover:bg-gray-50"
          >
            {selectedDropdownOption}
          </button>
          <img
            className="absolute right-5 pt-7 h-4 w-4"
            src={arrowDown}
            alt="arrowDown"
          />
        </div>
        {isDropdownDisplay && (
          <div className="divide-y absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {dropdownPlatforms.map((platform) => {
              const label = PLATFORM_INFO[platform].label;
              return (
                <div key={label} className="py-0.5">
                  <button
                    onClick={() => {
                      setSelectedDropdownOption(label);
                      setIsDropdownDisplay(false);

                      onAddPlatformClick(platform);
                    }}
                    className="text-gray-700 px-4 py-2 text-sm"
                  >
                    {label}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="pt-5">
        <div className="text-xs text-dark-med pb-1">Link</div>
        <input
          value={url}
          onChange={onUrlChange}
          className="relative flex w-full justify-start gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-thin text-gray-900 hover:shadow-md ring-1 ring-inset ring-gray-300 hover:ring-purple-med hover:bg-gray-50"
          placeholder="e.g https://www.github/yourname"
        />
      </div>
    </div>
  );
}