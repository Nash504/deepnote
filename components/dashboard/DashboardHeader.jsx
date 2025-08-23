// components/dashboard/DashboardHeader.jsx

"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import the shadcn/ui Skeleton

// A new component for the skeleton loading state using shadcn/ui
const HeaderSkeleton = () => (
  <>
    {/* Placeholder for the UserButton avatar */}
    <Skeleton className="h-14 w-14 rounded-full sm:h-16 sm:w-16" />
    <div className="space-y-2">
      {/* Placeholder for the "Welcome, Name" text */}
      <Skeleton className="h-10 w-[250px]" />
    </div>
  </>
);

export default function DashboardHeader() {
  const { isLoaded, user } = useUser();
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the fade-in animation once Clerk has loaded
  useEffect(() => {
    if (isLoaded) {
      setIsVisible(true);
    }
  }, [isLoaded]);

  return (
    <div
      className={`flex flex-row items-center gap-4 mb-4 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Show shadcn skeleton while Clerk is loading */}
      {!isLoaded ? (
        <HeaderSkeleton />
      ) : (
        <>
          <div className="flex-shrink-0">
            <SignedOut>
              <div className="flex items-center gap-4">
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
              </div>
            </SignedOut>

            <SignedIn>
              <div className="w-14 h-14 sm:w-16 sm:h-16">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-full h-full",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>

          <div className="flex-grow">
            <h1 className="text-4xl text-left font-semibold font-space-grotesk mb-10">
              {user?.firstName ? `Welcome, ${user.firstName}` : "Welcome"}
            </h1>
          </div>
        </>
      )}
    </div>
  );
}
