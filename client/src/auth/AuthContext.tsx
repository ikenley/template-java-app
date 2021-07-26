import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import { GoogleLoginResponse } from "react-google-login";

export type AuthState = {
  hasLoaded: boolean;
  isLoggedIn: boolean;
  userId: string;
  isAuthorized: boolean;
  handleLogin: (responseGoogle: any) => void;
  handleLogout: () => void;
  onAutoLoadFinished: (successLogin: boolean) => void;
};

const defaultAuthState: AuthState = {
  hasLoaded: false,
  isLoggedIn: false,
  userId: "",
  isAuthorized: false,
  handleLogin: () => {},
  handleLogout: () => {},
  onAutoLoadFinished: (successLogin: boolean) => {},
};

export const AuthContext = createContext(defaultAuthState);

export const AuthContextProvider = ({ children }: any) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [
    loginResponse,
    setLoginResponse,
  ] = useState<GoogleLoginResponse | null>(null);
  const hasLoadedOnce = useRef<boolean>(false);

  const handleLogin = useCallback(
    (response: GoogleLoginResponse) => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `bearer ${response.tokenId}`;

      setLoginResponse(response);
    },
    [setLoginResponse]
  );

  const handleLogout = useCallback(() => {
    setLoginResponse(null);
  }, [setLoginResponse]);

  const onAutoLoadFinished = useCallback(
    (successLogin: boolean) => {
      if (!successLogin) {
        setIsAuthorized(false);
      }
    },
    [setIsAuthorized]
  );

  // Upon login check api authorization
  useEffect(() => {
    if (!loginResponse) {
      if (hasLoadedOnce.current) {
        setIsAuthorized(false);
      } else {
        hasLoadedOnce.current = true;
      }
      return;
    }

    // axios
    //   .get("/api/main/authorization")
    //   .then((res) => {
         setIsAuthorized(true);
    //   })
    //   .catch((res) => {
    //     setIsAuthorized(false);
    //   });
  }, [loginResponse, setIsAuthorized]);

  const AuthState = useMemo(() => {
    return {
      hasLoaded: isAuthorized !== null,
      isLoggedIn: loginResponse !== null,
      userId: loginResponse?.googleId || "",
      isAuthorized: isAuthorized === true,
      handleLogin,
      handleLogout,
      onAutoLoadFinished,
    };
  }, [
    loginResponse,
    isAuthorized,
    handleLogin,
    handleLogout,
    onAutoLoadFinished,
  ]);

  return (
    <AuthContext.Provider value={AuthState}>{children}</AuthContext.Provider>
  );
};
