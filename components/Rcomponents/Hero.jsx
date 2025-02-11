"use client";

import { ArrowRight } from "lucide-react";
import React, { useState, useContext } from "react";
import Suggestion from "../boiler-plate/suggestion";
import { MessageContext } from "@/Context/MessageContext";
import { AuthenticationContext } from "@/Context/AuthenticationContext";
import SigninPage from "./SigninPage";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [userInput, setUserInput] = useState("");
  const { messages, setMessages } = useContext(MessageContext);
  const { authentication } = useContext(AuthenticationContext);
  const [openDialog, setOpenDialog] = useState(false); // ✅ Proper state
  const CreateWorkSpace = useMutation(api.workspace.CreateWorkspace);
  const router =  useRouter();

  const onGenerate = async(input) => {
    if (!authentication?.name) {
      setOpenDialog(true); // ✅ Correctly setting state to true
      return;
    }

    setMessages({
      role: "user", 
      content: input,
    });

    const workspaceId = await CreateWorkSpace({
      user: authentication._id,
      messages:[{
        role:"user",
        content: input,
      }]
    })
    console.log(workspaceId);
    router.push('/workspace/'+workspaceId);
  };

  return (
    <div className="flex flex-col items-center mt-36 xl:mt-40 gap-2">
      <h2 className="text-4xl font-bold">What do you want to build?</h2>
      <p className="text-gray-500 font-medium">
        Prompt, run, edit and deploy full-stack web apps
      </p>
      <div className="p-5 border rounded-xl max-w-xl w-full">
        <div className="flex gap-2">
          <textarea
            placeholder="What you want to build"
            onChange={(event) => setUserInput(event.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56"
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap max-w-2xl items-center justify-center gap-3">
        {Suggestion?.SUGGESTIONS.map((suggestion, index) => (
          <h2
            key={index}
            className="p-1 px-2 border rounded-full text-sm cursor-pointer"
            onClick={() => onGenerate(suggestion)}
          >
            {suggestion}
          </h2>
        ))}
      </div>
      {/* ✅ Pass boolean value instead of an object */}
      <SigninPage openDialog={openDialog} closeDialog={setOpenDialog} />
    </div>
  );
};

export default Hero;
