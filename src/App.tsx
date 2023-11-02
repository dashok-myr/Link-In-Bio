import { Route, Routes, useNavigate } from "react-router-dom";
import Navigation from "./Navigation.tsx";
import LinksBody from "./LinksBody";
import LinksProvider from "./context/LinksProvider.tsx";
import ProfileDetailsBody from "./ProfileDitailsBody";
import SignIn from "./SignIn.tsx";
import "./index.css";
import SignUp from "./SignUp.tsx";
import { UserContext } from "./context/UserProvider.tsx";
import Preview from "./Preview.tsx";
import { signOutUser } from "./firebase/firebase.tsx";
import NotificationProvider from "./context/NotificationProvider.tsx";
import { useContext } from "react";

export default function App() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <>
      <NotificationProvider>
        <LinksProvider>
          <div className="bg-dark-lighter h-screen">
            <Routes>
              {user === null ? (
                <>
                  <Route
                    path="/"
                    element={
                      <SignIn
                        onSignInSuccess={() => {
                          navigate("/");
                        }}
                      />
                    }
                  />
                  <Route
                    path="signup"
                    element={
                      <SignUp
                        onSignUpSuccess={() => {
                          navigate("/");
                        }}
                      />
                    }
                  />
                </>
              ) : (
                <>
                  <Route
                    path="/"
                    element={
                      <Navigation
                        onLinksClick={() => navigate("/")}
                        onProfileClick={() => navigate("/profile")}
                        onSignOutBtn={() => {
                          signOutUser();
                          navigate("/");
                        }}
                        onSignInBtn={() => {
                          navigate("/");
                        }}
                        onPreviewBtn={() => navigate("/preview")}
                      />
                    }
                  >
                    <Route index element={<LinksBody />} />
                    <Route path="profile" element={<ProfileDetailsBody />} />
                  </Route>
                  <Route path="preview" element={<Preview />} />
                </>
              )}
            </Routes>
          </div>
        </LinksProvider>
      </NotificationProvider>
    </>
  );
}
