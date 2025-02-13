"use client";

import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Suggestion from "../boiler-plate/Suggestion";
import axios from "axios";
import { MessageContext } from "@/Context/MessageContext";
import Prompt from "../boiler-plate/Prompt";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useConvex } from "convex/react";
import { Loader2Icon } from "lucide-react";


function CodeView() {
  const convex = useConvex();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Suggestion?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessageContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const[Loading, setLoading] = useState(false);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...Suggestion.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        generateCode();
      }
    }
  }, [messages]);

  const generateCode = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + " " + Prompt.GENERATE_CODE_PROMPT;
    const result = await axios.post("/api/generatecode", {
      prompt: PROMPT,
    });
    console.log(result.data);
    const aiResponse = result.data;

    const mergedFiles = { ...Suggestion.DEFAULT_FILE, ...aiResponse?.files };
    setFiles(mergedFiles);
    await UpdateFiles({
      workspaceId: id,
      files: aiResponse?.files,
    });
    setLoading(false);
  };
  return (
    <div>
      <div className="bg-[#18181] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-2 w-[140px] gap-3 justify-center rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${activeTab == "code" && "text-blue-500 bg-blue-500 bg-opacity-25 rounded-full p-1 px-2"}`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${activeTab == "preview" && "text-blue-500 bg-blue-500 bg-opacity-25 rounded-full p-1 px-2"}`}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        template="react"
        theme={"dark"}
        files={files}
        customSetup={{
          dependencies: {
            ...Suggestion.DEPENDENCY,
          },
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout>
          {activeTab == "code" ? (
            <>
              <SandpackFileExplorer
                style={{
                  height: "80vh",
                }}
              />
              <SandpackCodeEditor
                style={{
                  height: "80vh",
                }}
              />
            </>
          ) : (
            <>
              <SandpackPreview
                showNavigator={true}
                style={{
                  height: "80vh",
                }}
              />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
      <div className="p-10 bg-gray-800 opacity-50 absolute top-0 rounded-lg  flex items-center justify-center">
        <Loader2Icon className="animate-spin h-10 w-10 text-white"/>
        <h2 className="text-white">Generating Files...</h2>
      </div>
    </div>
  );
}

export default CodeView; 
