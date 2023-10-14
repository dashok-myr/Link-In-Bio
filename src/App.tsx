import { Route, Routes, useNavigate } from "react-router-dom";
import Navigation from "./Navigation.tsx";
import LinksBody from "./LinksBody";
import LinksProvider from "./context/LinksProvider.tsx";
import ProfileDetailsBody from "./ProfileDitailsBody";
import SignIn from "./SignIn.tsx";
import "./index.css";
import SignUp from "./SignUp.tsx";
import { UserProvider } from "./context/UserProvider.tsx";

export default function App() {
  const navigate = useNavigate();

  return (
    <UserProvider>
      <LinksProvider>
        <div className="bg-dark-lighter p-5 h-screen">
          <Routes>
            <Route
              path="/"
              element={
                <Navigation
                  onLinksClick={() => navigate("/")}
                  onProfileClick={() => navigate("/profile")}
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
