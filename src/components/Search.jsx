import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./context/locationContext";

const Search = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const { setLocationData, locationData } = useContext(LocationContext);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const clickHandler = (e) => {
    const loc = data[e.target.id];
    setLocationData(loc);
  };

  const address = input;
  useEffect(() => {
    const getData = async () => {
      if (address != "") {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=e31bf5171c604a6587630b27de2475f9`
          );
          const result = await response.json();

          setData(result.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    getData();
  }, [input]);
  return (
    <>
      <div className="text-center">
        <form className="" action="">
          <input
            className="w-[90%] rounded-2xl p-2 bg-gray-200 dark:bg-slate-600 dark:text-white"
            onChange={changeHandler}
            value={input}
            type="text"
            placeholder="location"
          />
        </form>
        <div className="fixed z-[1500] dark:bg-slate-800 ">
          {data &&
            data.map((loc, i) => (
              <h1
                className="dark:text-white"
                onClick={clickHandler}
                key={i}
                id={i}
              >
                {loc.formatted}
              </h1>
            ))}
        </div>
      </div>
    </>
  );
};

export default Search;
