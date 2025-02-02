import { ArrowRight } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
      <h2 className="text-4xl font-bold ">What do you want to build?</h2>
      <p className="text-gray-500 font-medium">
        Prompt,run,edit and deploy full-stack web apps
      </p>
      <div className="p-5 border rounded-xl max-w-2xl w-full">
        <div className="flex gap-3">
          <textarea placeholder="What you want to build" className="outline-none bg-transparent  h-32 max-h-56"/>
          <ArrowRight className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
