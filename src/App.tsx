import { Route, Routes, useNavigate } from "react-router-dom";
import Navigation from "./Navigation.tsx";
import LinksBody from "./LinksBody";
import LinksProvider from "./context/LinksProvider.tsx";
import ProfileDetailsBody from "./ProfileDitailsBody";
import SignIn from "./SignIn.tsx";
import "./index.css";

export default function App() {
  const navigate = useNavigate();

  return (
    <LinksProvider>
      <div className="bg-dark-lighter p-5 h-screen">
        <Navigation
          onLinksClick={() => navigate("/")}
          onProfileClick={() => navigate("/profile")}
        />
        <Routes>
          <Route path="/" element={<LinksBody />} />
          <Route path="/profile" element={<ProfileDetailsBody />} />
          <Route path="signin" element={<SignIn />} />
        </Routes>
      </div>
    </LinksProvider>
  );
}
