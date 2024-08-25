import React, { createContext, useContext, useState } from "react";


// Define the context
const CheckboxContext = createContext<any | undefined>(undefined);

// Provider component to wrap the application or parts of it
export const CheckboxProvider = ({ children }: any) => {
  const [checkedItem, setCheckedItem] = useState(false);
  const [checkedItem2, setCheckedItem2] = useState(false);

  return (
    <CheckboxContext.Provider value={{ checkedItem, setCheckedItem, checkedItem2, setCheckedItem2 }}>
      {children}
    </CheckboxContext.Provider>
  );
};

// Custom hook to use the CheckboxContext
export const useCheckbox = () => {
  return useContext(CheckboxContext);
};
