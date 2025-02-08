"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { MessageContext } from "@/Context/MessageContext";
import { useState } from "react";

import Header from "@/components/Rcomponents/Header";

function Provider({ children }) {

  const [messages, setMessages] = useState([]);
  
  return (
    <div>
      <MessageContext.Provider value={{ messages, setMessages }}>  
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      forcedTheme="dark"
    >
       <Header />
      {children}
     
    </ThemeProvider>
    </MessageContext.Provider>
  </div>
    
  );
}

export default Provider;
