import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./context/locationContext";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCD5N9puQOoYtBcdhfo3fOdzZT16vx9n8s";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const Overview = () => {
  const [info, setInfo] = useState();
  const { weatherData } = useContext(LocationContext);

  useEffect(() => {
    if (!weatherData) return;
   
    const getInfo = async (loc) => {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
      const result = await chatSession.sendMessage(
        `tell me some interresting facts about the area,${weatherData.name} and district lon:${weatherData.coord.lon},lat:${weatherData.coord.lat}.`
      );
      let responseArray = result.response.text().split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");
      setInfo(newResponse2);

      return;
    };
    getInfo();
  }, [weatherData]);

  return (
    <>
      <div className="dark:text-white  bg-slate-200 dark:bg-slate-600 my-2 mx-3 rounded-lg px-8 py-4 xl:px-24 overflow-x-auto">
        <p dangerouslySetInnerHTML={{ __html: info }}></p>
      </div>
    </>
  );
};

export default Overview;
