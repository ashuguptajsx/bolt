"use client";
import React, { use } from "react";
import { ThemeProvider } from "next-themes";
import { MessageContext } from "@/Context/MessageContext";
import { AuthenticationContext } from "@/Context/AuthenticationContext";
import { useState } from "react";
import { useEffect } from "react";

import Header from "@/components/Rcomponents/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

function Provider({ children }) {
  const [messages, setMessages] = useState([]);
  const [authentication, setAuthentication] = useState([]);
  const convex = useConvex();

  useEffect(() => {
    isAutheticated();   
  } ,[]); 


  const isAutheticated = async() => {
    if(typeof window !== "undefined"){
      const user = JSON.parse(localStorage.getItem("user"));
      const result = await convex.query(api.users.GetUser, {email: user?.email});
      console.log(result);
    }  
  }

  return (
    <div>
      
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}>
     <AuthenticationContext.Provider value = {{authentication, setAuthentication}}>
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
      </AuthenticationContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Provider;
