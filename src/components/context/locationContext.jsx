import { createContext, useState } from "react";

export const LocationContext = createContext();

export function LocationContextProvider({ children }) {
  const [locationData, setLocationData] = useState({});
  return (
    <LocationContext.Provider value={{ locationData, setLocationData }}>
      {children}
    </LocationContext.Provider>
  );
}
