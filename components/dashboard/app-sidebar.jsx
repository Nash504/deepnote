import * as React from "react";
import { FileUp, Menu } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
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
        <div className="flex items-center space-x-3 sm:space-x-4">
          <SignedOut>
            <SignInButton mode="redirect" redirectUrl={"/work"}>
              <button className="hidden sm:inline-block text-white/90 hover:text-lime-400 transition-colors text-sm sm:text-base">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="redirect" redirectUrl={"/work"}>
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-lime-400/90 hover:bg-lime-400 text-neutral-900 font-semibold rounded-md transition-all duration-300 text-sm sm:text-base backdrop-blur-sm shadow-md">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            {/* Added a subtle glow effect to the UserButton wrapper */}
          
              <UserButton afterSignOutUrl="/" />
          
          </SignedIn>
        </div>
    </SidebarHeader>

   

    
    </Sidebar>
  );
}
