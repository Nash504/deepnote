"use client";
import Link from 'next/link';
import React from 'react';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
// Import Clerk components
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Notebook } from 'lucide-react';
import { SheetTrigger,Sheet,SheetContent } from './ui/sheet';
const Navbar = () => {
  // Define URLs for redirection after sign-in/sign-up
  const afterSignInUrl = "/work"; // Replace with your dashboard route
  const afterSignUpUrl = "/work"; // Replace with your onboarding or dashboard route
  const pathname = usePathname();
  return (
    <header className="font-light sticky top-0 z-50 bg-neutral-900 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">

       
    {pathname === "/work" ? (
  <Sheet>
    <SheetTrigger>
      <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-lime-400 cursor-pointer" />
    </SheetTrigger>
    <SheetContent className="bg-black text-white ">

    </SheetContent>
  </Sheet>
) : (
  <>
    <Notebook className="h-5 w-5 sm:h-6 sm:w-6 text-lime-400" />
    <Link
      href="/"
      className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-300"
    >
      DeepNote
    </Link>
  </>
)}


        </div>

        {/* Center section - can be used for navigation links */}
        <div className="hidden md:flex items-center justify-center space-x-6">
          {/* Add your nav links here if needed */}
          {/* Using text-white/80 for semi-transparent text that fits the glass theme */}
        
          
        </div>

        {/* Auth Buttons */}
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
      </div>
    </header>
  );
};

export default Navbar;