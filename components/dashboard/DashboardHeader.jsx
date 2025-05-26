// components/dashboard/DashboardHeader.jsx

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function DashboardHeader({ user }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
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

      <div>
        <h1 className="text-4xl font-light font-space-grotesk bg-black bg-clip-text text-transparent">
          {user?.firstName ? `Welcome, ${user.firstName}` : "Hello Scholar"}
        </h1>
        <p className="mt-2 text-gray-500">Manage your notes and question papers</p>
      </div>
    </div>
  );
}
