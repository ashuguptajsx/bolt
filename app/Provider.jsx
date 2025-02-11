"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { MessageContext } from "@/Context/MessageContext";
import { AuthenticationContext } from "@/Context/AuthenticationContext";
import Header from "@/components/Rcomponents/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

function Provider({ children }) {
  const [messages, setMessages] = useState([]);
  const [authentication, setAuthentication] = useState(null); // ✅ Default is null, not an empty array
  const convex = useConvex();

  useEffect(() => {
    isAuthenticated();   
  }, []); 

  const isAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        const result = await convex.query(api.users.GetUser, { email: user?.email });

        if (result) {
          setAuthentication(result); // ✅ Set authentication properly if user exists
        } else {
          setAuthentication(null); // ✅ Reset if user doesn't exist in DB
        }
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}>
      <AuthenticationContext.Provider value={{ authentication, setAuthentication }}>
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
  );
}

export default Provider;
