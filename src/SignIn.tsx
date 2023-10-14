import { Link } from "react-router-dom";
import { IUser } from "./context/UserProvider.tsx";
import React, { useState } from "react";
import { signInWithPassword } from "./firebase/firebase.tsx";

const defaultFormField = {
  email: "",
  password: "",
};

interface ISignInProps {
  onSignInSuccess: (user: IUser | null) => void;
}

export default function SignIn({ onSignInSuccess }: ISignInProps) {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  const onInputFormHandle = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSignIn = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithPassword(email, password);
      setFormFields(defaultFormField);
      onSignInSuccess(userCredential.user as unknown as IUser);
    } catch (error) {
      console.log("user creation encountered an error", error);
    }
  };
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-16 lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-orange md:text-2xl">
              Log In
            </h1>
            <form className="space-y-4 md:space-y-6" action="src/routers#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  onChange={onInputFormHandle}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  onChange={onInputFormHandle}
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col">
                <div className="pb-5">
                  <button
                    onClick={onSignIn}
                    type="submit"
                    className="w-full text-white bg-purple hover:bg-purple-light hover:text-purple focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Log In with Email
                  </button>
                </div>
              </div>

              <p className="text-sm font-light text-gray-500">
                Don't have an account?
                <Link
                  to="/signup"
                  className="font-medium text-purple hover:underline"
                >
                  Signup here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
