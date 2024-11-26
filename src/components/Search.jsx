import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./context/locationContext";

const Search = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const { setLocationData } = useContext(LocationContext);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const clickHandler = (e) => {
    console.log(e.target.id);
    const loc = data[e.target.id];
    setLocationData(loc);
  };

  const address = input;
  useEffect(() => {
    const getData = async () => {
      if (address != "") {
        try {
          const response = await fetch("http://localhost:3007/geocode", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ address }),
          });
          const result = await response.json();
          console.log(result);
          setData(result);
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
                {loc.address.city}
              </h1>
            ))}
        </div>
      </div>
    </>
  );
};

export default Search;
