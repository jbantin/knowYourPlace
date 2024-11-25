import { createContext, useState } from "react";

export const LocationContext = createContext();

export function LocationContextProvider({ children }) {
  const [locationData, setLocationData] = useState({ lat : 53.55, lon: 10});
  return (
    <LocationContext.Provider value={{ locationData, setLocationData }}>
      {children}
    </LocationContext.Provider>
  );
}
