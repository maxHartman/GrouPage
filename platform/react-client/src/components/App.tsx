import React from "react";
// @ts-ignore
import { AuthConsumer, AuthProvider } from "react-check-auth";

import LandingPage from "./landingPage/LandingPage";
import Home from "./Home";

const AUTH_URL = "/getUserInfo";

export default function App() {
  return (
    <AuthProvider authUrl={AUTH_URL}>
      <div className="App">
        {/* If user info is non-null and id is null, user is authenticated,
        otherwise user is not authenticated */}
        <AuthConsumer>
          {({ userInfo }: { userInfo: any }) => {
            return userInfo != null && userInfo.id == null ? (
              <Home />
            ) : (
              <LandingPage />
            );
          }}
        </AuthConsumer>
      </div>
    </AuthProvider>
  );
}
