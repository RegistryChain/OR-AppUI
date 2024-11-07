import React, { createContext, useContext, useEffect, useState } from "react";


// Define the context
const CheckboxContext = createContext<any | undefined>(undefined);

// Provider component to wrap the application or parts of it
export const CheckboxProvider = ({ children }: any) => {
  const [checkedItem, setCheckedItem] = useState(false);
  const [checkedItem2, setCheckedItem2] = useState(false);
  const [checkedItem3, setCheckedItem3] = useState(false);
  const [checkedItem4, setCheckedItem4] = useState(false);
  const [checkedItem5, setCheckedItem5] = useState(false);
  const [checkedItem6, setCheckedItem6] = useState(false);
  const [checkedItem7, setCheckedItem7] = useState(false);
  const [checkedItem8, setCheckedItem8] = useState(false);
  const [checkedItem9, setCheckedItem9] = useState(false);
  const [checkedItem10, setCheckedItem10] = useState(false);
  useEffect(() => {
    console.log(1, checkedItem)
  }, [checkedItem])

  useEffect(() => {
    console.log(2, checkedItem2)
  }, [checkedItem2])
  
  return (
    <CheckboxContext.Provider value={{ checkedItem, setCheckedItem, checkedItem2, setCheckedItem2, checkedItem3, setCheckedItem3, checkedItem4, setCheckedItem4, checkedItem5, setCheckedItem5, checkedItem6, setCheckedItem6, checkedItem7, setCheckedItem7, checkedItem8, setCheckedItem8, checkedItem9, setCheckedItem9, checkedItem10, setCheckedItem10 }}>
      {children}
    </CheckboxContext.Provider>
  );
};

// Custom hook to use the CheckboxContext
export const useCheckbox = () => {
  return useContext(CheckboxContext);
};
