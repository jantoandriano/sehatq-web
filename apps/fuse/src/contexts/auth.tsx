import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

type AuthProviderProps = {
  children: React.ReactNode;
};

type TUser = {
  token: string;
  sbtoken: string;
  sbUserId: string;
  id: number;
  uuid: string;
  channel: string;
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  idType: string;
  idNumber: string;
  createdAt: Date;
  updatedAt: Date;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Record<string, unknown>>({});
  const token = Cookies.get("token");

  useEffect(() => {
    if (!user.token || user.token !== token) {
      setUser({
        token,
        sbtoken: Cookies.get("sbtoken"),
        sbUserId: Cookies.get("sbUserId"),
        ...(Cookies.get("userChannelData") && {
          ...JSON.parse(Cookies.get("userChannelData") || ""),
        }),
      });
    }
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

const useAuth = (): Record<string, TUser> => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
