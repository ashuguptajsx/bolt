"use client";
import { ArrowRight } from "lucide-react";
import React, { useState, useContext } from "react";
import Suggestion from "../boiler-plate/Suggestion";
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
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkSpace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async(input) => {
    if (!authentication?.name) {
      setOpenDialog(true);
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
    <div className="flex flex-col items-center justify-center lg:px-[470px] min-h-screen text-center px-4 bg-black">
      <div className="w-full max-w-xl space-y-8 bg-gray-950 p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">What do you want to build?</h2>
          <p className="text-gray-500 font-medium">
            Prompt, run, edit and deploy full-stack web apps
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex gap-4 items-center">
            <textarea
              placeholder="What you want to build"
              onChange={(event) => setUserInput(event.target.value)}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-white placeholder-gray-600"
            />
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-blue-500 p-2 h-10 w-10 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              />
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          {Suggestion?.SUGGESTIONS.map((suggestion, index) => (
            <h2
              key={index}
              className="p-2 px-3 border border-gray-700 rounded-full text-sm cursor-pointer 
              text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              onClick={() => onGenerate(suggestion)}
            >
              {suggestion}
            </h2>
          ))}
        </div>
      </div>

      <SigninPage openDialog={openDialog} closeDialog={setOpenDialog} />
    </div>
  );
};

export default Hero;