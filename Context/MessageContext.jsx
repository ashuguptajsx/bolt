import { createContext, useState } from "react";

export const MessageContext = createContext({
  messages: [],
  setMessages: () => {},
});
