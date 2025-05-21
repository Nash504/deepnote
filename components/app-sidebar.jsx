import * as React from "react";
import { FileUp, Menu } from "lucide-react";
import { useUser } from "@clerk/nextjs";

// Assuming these components are correctly imported from your UI library
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

// Sample data for the sidebar structure


export default function AppSidebar() {
  return (
    // The main Sidebar container
    <Sidebar className="w-64 bg-black h-screen shadow-lg">  
    <SidebarHeader className="flex  flex-row items-center p-4  text-black">
      <FileUp className="h-6 w-6" />
      <h1 className="text-2xl font-semibold">Pdf Library</h1>
    </SidebarHeader>

   

    
    </Sidebar>
  );
}
