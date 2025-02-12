"use client";
import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessageContext } from "@/Context/MessageContext";
import { AuthenticationContext } from "@/Context/AuthenticationContext";
import Image from "next/image";
import { ArrowRight, Loader2Icon } from "lucide-react";
import Prompt from "../boiler-plate/Prompt";
import axios from "axios";
import ReactMarkdown from "react-markdown"; 

function ChatView() {
  const convex = useConvex();
  const { authentication } = useContext(AuthenticationContext);
  const { messages, setMessages } = useContext(MessageContext);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { id } = useParams();


 

  useEffect(() => {
    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
    console.log(result);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        GetResponse();
      }
    }
  }, [messages]);

  const GetResponse = async () => {
    setLoading(true);

    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/chat", {
      prompt: PROMPT,
    });
    console.log(result.data.result);
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: result.data.result,
      },
    ]);
    await UpdateMessages({
      messages:[...messages,{
          role: "ai",
          content: result.data.result
      }],
      workspaceId: id,
    })
    setLoading(false);
  };

  const onGenerate = async (input) => {
    setMessages(prev =>[...prev,{
        role: "user",
        content: input, 
    }]);
    setUserInput("");
  }

  return (
    <div className="h-[85vh] flex flex-col">
      {/* Messages Container (Scrollable) */}
      <div className="flex-1 overflow-y-scroll scrollbar-hide space-y-2">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-gray-800 flex gap-2 items-center leading-7"
          >
            {msg.role === "user" && (
              <Image
                src={authentication?.picture}
                alt="userImage"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <ReactMarkdown className="flex flex-col">{msg.content}</ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div className="p-3 rounded-lg bg-gray-800 flex gap-2 items-start">
            <Loader2Icon className="animate-spin" />
            <h2>Generating...</h2>
          </div>
        )}
      </div>

      {/* Input Box (Fixed at Bottom) */}
      <div className="p-5 mt-3 border rounded-xl max-w-xl w-full bg-gray-950">
        <div className="flex gap-2">
          <textarea
            placeholder="What you want to build"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatView;
