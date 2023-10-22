import { Route, Routes, useNavigate } from "react-router-dom";
import Navigation from "./Navigation.tsx";
import LinksBody from "./LinksBody";
import LinksProvider from "./context/LinksProvider.tsx";
import ProfileDetailsBody from "./ProfileDitailsBody";
import SignIn from "./SignIn.tsx";
import "./index.css";
import SignUp from "./SignUp.tsx";
import { UserProvider } from "./context/UserProvider.tsx";
import Preview from "./Preview.tsx";
import { signOutUser } from "./firebase/firebase.tsx";

export default function App() {
  const navigate = useNavigate();

  return (
    <UserProvider>
      <LinksProvider>
        <div className="bg-dark-lighter h-screen">
          <Routes>
            <Route path="preview" element={<Preview />} />
            <Route
              path="/"
              element={
                <Navigation
                  onLinksClick={() => navigate("/")}
                  onProfileClick={() => navigate("/profile")}
                  onSignOutBtn={() => {
                    signOutUser();
                    navigate("/signin");
                  }}
                  onSignInBtn={() => {
                    navigate("/signin");
                  }}
                  onPreviewBtn={() => navigate("/preview")}
                />
              }
            >
              <Route index element={<LinksBody />} />
              <Route path="profile" element={<ProfileDetailsBody />} />
            </Route>
            <Route
              path="signin"
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
          </Routes>
        </div>
      </LinksProvider>
    </UserProvider>
  );
}
