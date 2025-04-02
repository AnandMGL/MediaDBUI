import { createContext, useContext, useState } from "react";

const AppContext = createContext();
const useApp = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <AppContext.Provider
      value={{
        setSearchValue,
        searchValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { useApp, AppProvider };
