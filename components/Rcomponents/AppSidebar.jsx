import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import Footer from "./Footer";

import Image from "next/image";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";

const AppSidebar = () => {
  return (
    <div>
      <Sidebar>
        <SidebarHeader className="p-5">
            <Image src = {"/icons8-bolt-100.png"} width = {30} height={30} alt ="logo"></Image>
        </SidebarHeader>

        <SidebarContent className="p-5">
            <Button> <MessageCircleCode/> Start new Conversation</Button>
          <SidebarGroup />
          <WorkspaceHistory/>
          {/* <SidebarGroup /> */}
        </SidebarContent>
        <SidebarFooter >
           <Footer/>
          </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;
