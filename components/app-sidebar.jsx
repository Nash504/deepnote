import * as React from "react";
import { FileUp, Menu } from "lucide-react";
import { useUser } from "@clerk/nextjs";

// Assuming these components are correctly imported from your UI library
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  SidebarRail,
  SidebarHeader,
} from "@/components/ui/sidebar";

// Sample data for the sidebar structure


export default function AppSidebar() {
  return (
    // The main Sidebar container
    <Sidebar className="border-r-2 border-gray-800 bg-gray-900 w-64">
    <SidebarHeader className={"flex items-center justify-between p-4 bg-gray-800 text-black"}>
      Pdf Library
    </SidebarHeader>

   

    
    </Sidebar>
  );
}
