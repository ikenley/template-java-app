import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import { GoogleLoginClientId } from "../constants";
import { AuthContext } from "../auth/AuthContext";

const responseGoogle = (response: any) => {
  console.log(response);
};

const LoginButton = () => {
  const authContext = useContext(AuthContext);

  return (
    <GoogleLogin
      clientId={GoogleLoginClientId}
      buttonText="Login"
      onSuccess={authContext.handleLogin}
      onFailure={responseGoogle}
      onAutoLoadFinished={authContext.onAutoLoadFinished}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};

export default LoginButton;
