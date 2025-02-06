"use client";

import { ArrowRight, Link } from "lucide-react";
import React from "react";
import { useState } from "react";
import Suggestion from "../boiler-plate/suggestion";

const Hero = () => {

  const[userInput, setUserInput] = useState("")
  return (
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
      <h2 className="text-4xl font-bold ">What do you want to build?</h2>
      <p className="text-gray-500 font-medium">
        Prompt,run,edit and deploy full-stack web apps
      </p>
      <div className="p-5 border rounded-xl max-w-2xl w-full">
        <div className="flex gap-2">
          <textarea placeholder="What you want to build"
          onChange = {(event) => setUserInput(event.target.value)}
           className="outline-none bg-transparent w-full h-32 max-h-56 "/>
         {userInput && <ArrowRight className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer" />}
        </div>
        <Link className="h-5 w-5"/>
      </div>
      <div className="flex flex-wrap ">
       {Suggestion?.SUGGESTIONS.map((suggestion, index) => (
        <h2 key={index}>{suggestion} </h2>
       ))}
      </div>
    </div>
  );
};

export default Hero;
