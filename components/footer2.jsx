'use client';
import { Notebook } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

const Footer2 = ({
  productName = "Join the Future of Focused Learning.",
  tagline = "Unlock unmatched study efficiency with DeepNote. Remember, the path to effortless knowledge is now open.",
  copyright = "© 2025 CodeX. All rights reserved.",
}) => {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black to-neutral-800 opacity-70"></div>

      {/* Abstract shape */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-lime-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute top-12 -left-12 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl px-6 py-16 relative z-10">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            {/* Added flex items-center to align icon and text */}
          
            <span className="text-2xl font-bold text-lime-300">
              {productName}
            </span>
          </div>

          <h3 className="text-sm font-light mb-6 px-4 py-2 bg-gradient-to-r  text-white bg-clip-text ">
            {tagline}
          </h3>
          <Button  onClick={() => window.location.href = "/work"}  className="bg-lime-300 text-black font-bold text-lg py-4 px-6 rounded-full hover:bg-lime-400 transition duration-300 ease-in-out ">
            Get Started
          </Button>

          {/* Email subscribe form */}

          {/* Simplified links in a single row */}

          {/* Social icons with larger, more creative style */}
          <div className="flex gap-6 mb-8 mt-6">
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 hover:bg-lime-400 hover:text-neutral-900 transition-all transform hover:scale-110"
            >
              <GitHubLogoIcon className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 hover:bg-lime-400 hover:text-neutral-900 transition-all transform hover:scale-110"
            >
              <LinkedInLogoIcon className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 hover:bg-lime-400 hover:text-neutral-900 transition-all transform hover:scale-110"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
              </svg>
            </a>
          
          </div>
        </div>

        {/* Bottom line with animated border */}
        <div className="relative justify-center items-center text-center">
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent"
          ></div>
          <div className="flex flex-wrap justify-center gap-8 mb-12 pt-12 font-medium">
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>

          <p className="text-neutral-500 text-sm text-center pt-8">
            {copyright}
          </p>
          {/* Adjusted the div for Heart icon and text to use flex for alignment */}
          <div className="flex items-center justify-center gap-2 mt-4 text-neutral-500 text-sm">
             {/* Added text-neutral-500 and text-sm for consistent styling */}
            <Heart className="h-4 w-4"/> {/* Adjusted size for better fit */}
            <p>Made with passion and codeX</p> {/* Changed text for clarity */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer2 };