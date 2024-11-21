import "./App.css";
import Header from "./components/Header";
import Info from "./components/Info";
import Overview from "./components/Overview";
import Search from "./components/Search";
import Map from "./components/Map";

function App() {
  return (
    <>
      <div>
        <Header />
        <Search />
      </div>

      <Map />

      <div>
        <Overview />
        <Info />
      </div>
    </>
  );
}

export default App;
