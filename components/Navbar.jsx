import Link from 'next/link';
import React from 'react';
// Import Clerk components
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

const Navbar = () => {
  // Define URLs for redirection after sign-in/sign-up
  const afterSignInUrl = "/dashboard"; // Replace with your dashboard route
  const afterSignUpUrl = "/dashboard"; // Replace with your onboarding or dashboard route

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 bg-opacity-80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-lime-400">
          DeepNote {/* Replace with your logo */}
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#" className="text-white hover:text-lime-400 transition-colors">
            Features
          </Link>
          <Link href="#" className="text-white hover:text-lime-400 transition-colors">
            Testimonials
          </Link>
           <Link href="#" className="text-white hover:text-lime-400 transition-colors">
            Integrations
          </Link>
          {/* Add more links as needed */}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
            {/* Show Sign In and Sign Up when signed out */}
            <SignedOut>
                <SignInButton mode="redirect" redirectUrl={afterSignInUrl}>
                    <button className="hidden md:inline-block text-white hover:text-lime-400 transition-colors">
                        Login
                    </button>
                </SignInButton>
                 <SignUpButton mode="redirect" redirectUrl={afterSignUpUrl}>
                     <button className="px-4 py-2 bg-lime-400 text-neutral-900 font-semibold rounded-md hover:bg-lime-500 transition-colors">
                       Get Started
                     </button>
                 </SignUpButton>
            </SignedOut>
            {/* Show User Button when signed in */}
            <SignedIn>
                {/* UserButton provides account management and sign out */}
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
        </div>

        {/* Mobile Menu Button (Optional - requires state/logic) */}
        {/* <div className="md:hidden">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;