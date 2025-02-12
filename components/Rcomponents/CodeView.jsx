"use client";

import React from "react";
import { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Suggestion from "../boiler-plate/Suggestion";

function CodeView() {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Suggestion?.DEFAULT_FILE);
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
      <SandpackProvider template="react" theme={"dark"}
     files={files}
      customSetup={{
        dependencies:{
          ...Suggestion.DEPENDENCY,
        }
      }}
      options={
      {
        externalResources: ["https://cdn.tailwindcss.com"]
      }
      }
      >
        <SandpackLayout>
          {activeTab == "code" ?  <>
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
          </>:
          <>
            <SandpackPreview
            showNavigator={true}
              style={{
                height: "80vh",
              }}
            />
          </>}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeView;
