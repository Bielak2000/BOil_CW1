import { useState } from "react";
import { createContainer } from "unstated-next";


const useAuthStateContainer = createContainer(() => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const clearUser = () => {
    setIsLoggedIn(false);
   
  };

  return {
    clearUser,
    isLoggedIn,
    setIsLoggedIn,
  };
});

export const AuthStateProvider = useAuthStateContainer.Provider;
export const useAuthState = useAuthStateContainer.useContainer;
