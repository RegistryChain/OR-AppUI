import React, { createContext, useContext, useEffect, useState } from "react";


// Define the context
const CheckboxContext = createContext<any | undefined>(undefined);

// Provider component to wrap the application or parts of it
export const CheckboxProvider = ({ children }: any) => {
  const [checkedItem, setCheckedItem] = useState(false);
  const [checkedItem2, setCheckedItem2] = useState(false);
  useEffect(() => {
    console.log(1, checkedItem)
  }, [checkedItem])

  useEffect(() => {
    console.log(2, checkedItem2)
  }, [checkedItem2])
  
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
