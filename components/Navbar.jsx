import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Notebook } from "lucide-react";
import { Button } from "./ui/button";
export default function Navbar() { 
    return(
    <div className="bg-black font-space-grotesk flex justify-between items-center p-4 gap-4 h-16 w-full">
      <div className="flex flex-row items-center gap-2">
    <Notebook className="h-8 w-8 text-lime-300" /> 
    <p className="text-lime-300 text-3xl ">DEEPNOTE</p>  
    </div>
    <header className="text-sm flex justify-end items-center p-4 gap-4 h-16 lg:text-lg text-lime-300 font-bold">
    <SignedOut>
      <SignInButton className=" text-amber-50  " />
      <SignUpButton className=" text-amber-50 " />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  
   
  </header></div> 
  )
}
