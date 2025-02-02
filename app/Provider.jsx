"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

import Header from "@/components/Rcomponents/Header";

function Provider({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      forcedTheme="dark"
    >
       <Header />
      {children}
     
    </ThemeProvider>
  );
}

export default Provider;
