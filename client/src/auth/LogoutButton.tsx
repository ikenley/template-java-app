import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { GoogleLoginClientId } from "../constants";
import { AuthContext } from "./AuthContext";

const LogoutButton = () => {
  const authContext = useContext(AuthContext);

  return (
    <GoogleLogout
      clientId={GoogleLoginClientId}
      buttonText="Logout"
      onLogoutSuccess={authContext.handleLogout}
    />
  );
};

export default LogoutButton;
