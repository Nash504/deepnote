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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  Bell,
  BookOpen,
  User,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";

// A new component for the skeleton loading state using shadcn/ui
const HeaderSkeleton = () => (
  <div className="flex flex-row items-center gap-4 mb-4 w-full">
    {/* Placeholder for the UserButton avatar with pulsing effect */}
    <div className="relative">
      <Skeleton className="h-16 w-16 rounded-full sm:h-20 sm:w-20 animate-pulse" />
      <Skeleton className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full" />
    </div>
    <div className="space-y-2 flex-grow">
      {/* Placeholder for the "Welcome, Name" text */}
      <Skeleton className="h-10 w-[250px] animate-pulse" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-[180px]" />
      </div>
    </div>
    <div className="hidden md:flex gap-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  </div>
);

export default function DashboardHeader() {
  const { isLoaded, user } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [greeting, setGreeting] = useState("Welcome");

  // Trigger the fade-in animation once Clerk has loaded
  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [isLoaded]);

  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Get current date for display
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate);

  return (
    <div
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {/* Show enhanced skeleton while Clerk is loading */}
      {!isLoaded ? (
        <HeaderSkeleton />
      ) : (
        <>
          <div className="flex flex-row items-center gap-6 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex-shrink-0 relative">
              <SignedOut>
                <div className="flex items-center gap-4">
                  <SignInButton mode="redirect" redirectUrl={"/work"}>
                    <button className="px-4 py-2 border border-gray-200 hover:border-primary/50 hover:text-primary transition-all duration-300 rounded-lg text-sm font-medium">
                      Login
                    </button>
                  </SignInButton>
                  <SignUpButton mode="redirect" redirectUrl={"/work"}>
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-300 text-sm shadow-sm hover:shadow-md hover:scale-[1.03]">
                      Get Started
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] transition-all hover:scale-105 duration-300">
                  <div className="  rounded-full p-0.5 bg-white">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-full h-full",
                          userButtonTrigger:
                            "hover:scale-105 transition-transform",
                        },
                      }}
                    />
                  </div>
                </div>
              </SignedIn>
            </div>

            <div className="flex-grow">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <h1 className="text-3xl sm:text-4xl text-left font-semibold font-space-grotesk mb-1.5 bg-gradient-to-r from-gray-900 via-indigo-800 to-primary bg-clip-text text-transparent">
                    {user?.firstName
                      ? `${greeting}, ${user.firstName}`
                      : greeting}
                  </h1>
                  <div className="flex ml-4">
                    <Badge
                      variant="outline"
                      className="ml-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-indigo-700 border-indigo-200 hidden md:flex gap-1 items-center text-xs font-medium py-1.5 transition-all hover:scale-105 duration-300 cursor-default"
                    >
                      <BookOpen className="h-3 w-3" />
                      <span>Student</span>
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center mt-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
                    {formattedDate}
                  </div>
                  <div className="flex items-center ml-4">
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                    <span className="ml-1 text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer">
                      Dashboard
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
