import { ChangeEvent } from "react";
import classNames from "classnames";

interface IProfileUserInfo {
  firstName: string | undefined;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  lastName: string | undefined;
  onLastNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
}

export default function ProfileUserInfo({
  firstName,
  onNameChange,
  lastName,
  onLastNameChange,
  email,
  onEmailChange,
  isError,
}: IProfileUserInfo) {
  return (
    <div className="flex flex-col gap-5 items-center justify-between p-5 bg-dark-lighter rounded-lg">
      <div className="relative flex items-center w-full">
        <div className=" basis-1/2 w-full text-dark-med">First Name*</div>
        {isError && !firstName && (
          <div className="absolute text-xs text-red-500 right-2 top-2.5">
            Can't be empty
          </div>
        )}
        <input
          value={firstName}
          onChange={onNameChange}
          className={classNames(
            "w-full text-dark-med bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5",
            {
              "ring-1 outline-none ring-red-400": isError && !firstName,
            }
          )}
          placeholder="e.g. John"
        />
      </div>
      <div className="relative flex items-center w-full">
        <div className="basis-1/2 w-full text-dark-med">Last Name*</div>
        {isError && !lastName && (
          <div className="absolute text-xs text-red-500 right-2 top-2.5 z-10">
            Can't be empty
          </div>
        )}
        <input
          value={lastName}
          onChange={onLastNameChange}
          className={classNames(
            "w-full text-dark-med bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5",
            {
              "ring-1 outline-none ring-red-400": isError && !lastName,
            }
          )}
          placeholder="e.g. Apleeseed"
        />
      </div>
      <div className="flex items-center w-full">
        <div className="basis-1/2 w-full text-dark-med">Email</div>
        <input
          value={email}
          onChange={onEmailChange}
          className="w-full text-dark-med bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5"
          placeholder="e.g. email@example.com"
        />
      </div>
    </div>
  );
}
