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
} from "@/components/ui/sidebar";

// Sample data for the sidebar structure
const data = {
  months: [
    {
      name: "Month",
      topics: [
        { title: "Title of the First Topic", url: "#" },
        { title: "Title of the Second Topic", url: "#" },
        { title: "Title of the Third Topic", url: "#" },
      ]
    },
    {
      name: "Month",
      topics: [
        { title: "Title of the First Topic", url: "#" },
      ]
    }
  ]
};



export default function AppSidebar() {
  return (
    // The main Sidebar container
    <Sidebar className="border-r-2 border-gray-800 bg-gray-900 w-64">
      {/*
        SidebarTrigger component. This button will toggle the sidebar open/closed.
        Updated to use a button with a Menu icon for a more standard trigger.
      */}
   

      {/*
        SidebarContent component. This contains the main content of the sidebar
        when it is open.
      */}
      <SidebarContent className="bg-black text-white p-0 flex flex-col">
        {/* NoteFrame header section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center">
            {/* Menu icon in the header */}
        
            {/* App title */}
            <span className="text-lime-300 font-medium">NoteFrame</span>
          </div>
          {/* Button for potential full-screen or collapse action */}
         
            {/* Unicode character for expand/collapse */}
           
      
        </div>

        {/* Upload PDF Button section */}
        <div className="p-4">
          {/* Button to upload PDF, styled with lime background */}
          <button className="bg-lime-300 text-black font-medium rounded-full py-2 px-4 w-full flex items-center justify-center hover:bg-lime-400 transition-colors">
            Upload pdf
          </button>
        </div>

        {/* Month sections with topics - This area will scroll if content overflows */}
        <div className="flex-1 overflow-y-auto"> {/* Use overflow-y-auto for vertical scrolling */}
          {/* Map through the months data */}
          {data.months.map((month, monthIndex) => (
            // SidebarGroup for each month
            <SidebarGroup key={monthIndex} className="mt-0">
              {/* Label for the month group */}
              <SidebarGroupLabel className="text-white font-bold px-4 py-2">
                {month.name}
              </SidebarGroupLabel>
              {/* Content area for the month's topics */}
              <SidebarGroupContent>
                {/* Menu for the topics within the month */}
                <SidebarMenu>
                  {/* Map through the topics for the current month */}
                  {month.topics.map((topic, topicIndex) => (
                    // SidebarMenuItem for each topic
                    <SidebarMenuItem key={topicIndex}>
                      {/* Button acting as a link for the topic */}
                      <SidebarMenuButton asChild>
                        {/* Link element styled as a menu item */}
                        <a href={topic.url} className="block px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors">
                          {topic.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>

        {/* Account section at the bottom */}
        <div className="mt-auto p-4 border-t border-gray-800">
          <div className="flex items-center">
            {/* Placeholder for account icon/avatar */}
            <div className="w-8 h-8 bg-lime-300 rounded-full flex items-center justify-center mr-3"></div>
            {/* Account name */}
            <span className="text-white">Account name</span>
          </div>
        </div>
      </SidebarContent>

      {/* SidebarRail component (if used for a collapsed state) */}
   
    </Sidebar>
  );
}
