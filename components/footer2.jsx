import { Notebook } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const Footer2 = ({
  productName = "Join the Future of Focused Learning.",
  tagline = "Unlock unmatched study efficiency with [Your Product Name]. Remember, the path to effortless knowledge is now open.",
  copyright = "© 2025 CodeX. All rights reserved.",
}) => {
  return (
    <footer className="relative bg-neutral-900 text-white overflow-hidden">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800 opacity-70"></div>
      
      {/* Abstract shape */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-lime-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute top-12 -left-12 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl px-6 py-16 relative z-10">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
          
            <span className="text-2xl font-bold">{productName}</span>
          </div>
          
          <h3 className="text-sm font-bold mb-6 px-4 py-2 bg-gradient-to-r  text-white bg-clip-text ">
            {tagline}
          </h3>
          
          {/* Email subscribe form */}
          <div className="w-full max-w-md mt-8 mb-12">
            <p className="text-neutral-300 mb-4">Join our community and stay updated</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-lime-400 focus:outline-none text-white"
              />
              <button className="px-6 py-3 rounded-lg bg-lime-400 text-neutral-900 font-semibold hover:bg-lime-300 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          
          {/* Simplified links in a single row */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 font-medium">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">About</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms</a>
          </div>
          
          {/* Social icons with larger, more creative style */}
          <div className="flex gap-6 mb-8">
            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 hover:bg-lime-400 hover:text-neutral-900 transition-all transform hover:scale-110">
              <GitHubLogoIcon className="h-6 w-6" />
            </a>
            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 hover:bg-lime-400 hover:text-neutral-900 transition-all transform hover:scale-110">
              <LinkedInLogoIcon className="h-6 w-6" />
            </a>
            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 hover:bg-lime-400 hover:text-neutral-900 transition-all transform hover:scale-110">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
              </svg>
            </a>
            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 hover:bg-lime-400 hover:text-neutral-900 transition-all transform hover:scale-110">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Bottom line with animated border */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent"></div>
          <p className="text-neutral-500 text-sm text-center pt-8">{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export { Footer2 };