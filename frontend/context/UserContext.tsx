import { createContext, useContext, useState } from "react";

const UserContext = createContext<any>(null);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }: any) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user") || "") || null
  );
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
