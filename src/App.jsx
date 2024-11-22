import "./App.css";
import Header from "./components/Header";
import Info from "./components/Info";
import Overview from "./components/Overview";
import Search from "./components/Search";
import Map from "./components/Map";
import {
  LocationContext,
  LocationContextProvider,
} from "./components/context/locationContext";

function App() {
  return (
    <>
      <LocationContextProvider>
        <Header />
        <Search />

        <Map />

        <div>
          <Overview />
          <Info />
        </div>
      </LocationContextProvider>
    </>
  );
}

export default App;
