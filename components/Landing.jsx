'use client'
import Image from "next/image";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ArrowRight, Plus, Mic } from "lucide-react"; // Import necessary icons
import { InteractiveHoverButton } from "./magicui/interactive-hover-button"; // Assuming this is still used elsewhere or intended
import { useInView } from 'react-intersection-observer'; // Import useInView

export default function Home() {
  // Use the useInView hook to detect when the component is in view
  // triggerOnce: true ensures the animation only happens once
  // threshold: 0.1 means the animation triggers when 10% of the component is visible
  const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
  });

  // Define animation classes based on inView state
  // We'll use a simple fade-in and a slight upward movement
  const animationClasses = inView
      ? 'opacity-100 translate-y-0' // Fully visible and in place when in view
      : 'opacity-0 translate-y-10'; // Invisible and slightly below its final position when not in view

  return (
    // Main container with dark background and padding
    // Using a dark background to match the chat interface style
    // Attach the ref here to observe the entire section
    // Apply transition and animation classes to the main container
    <div
      ref={ref} // Attach the ref to the element you want to observe
      className={`bg-black text-white font-space-grotesk gap-8 justify-start min-h-screen p-4 sm:p-8
                 `} // Apply animation classes
    >
      <div className={`flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto  transition-all duration-700 ease-out ${animationClasses}`}> {/* Added max-w and mx-auto for centering */}
        <div className="flex flex-col gap-8 items-center lg:items-start flex-1 mt-12 lg:mt-24"> {/* Adjusted margin top */}
          {/* Main heading */}
          <h1 className="font-bold text-4xl sm:text-5xl text-center lg:text-left">
            Instant PDF Answers. Study Smarter.
          </h1>
          {/* Subheading */}
          <p className="font-light text-xl sm:text-2xl text-center lg:text-left text-gray-300"> {/* Added gray text color */}
            Query your study materials with AI. Unlock rapid understanding and pinpoint key information within your notes and texts. Fast, focused learning.
          </p>
          {/* Added a div for the button to control its width better */}
           <div className="w-full sm:w-auto mt-4 lg:mt-0">
              <Button className="bg-lime-300 text-black font-bold text-lg py-3 px-6 rounded-full hover:bg-lime-400 transition duration-300 ease-in-out w-full"> {/* Adjusted padding, text size, and rounded corners */}
                  Get Started
              </Button>
           </div>
        </div>

        {/* Card styled as AI Chat Field */}
        {/* Removed max-w-[350px] to allow it to take more space on larger screens if needed */}
        <div className="flex justify-center flex-1 mt-8 lg:mt-0">
          <Card className="w-full bg-neutral-900 rounded-lg p-4 flex flex-col h-[500px] relative overflow-hidden"> {/* Added dark background, padding, flex column, height, relative positioning, and overflow hidden */}
             {/* Chat Message Area */}
             <div className="flex-1 overflow-y-auto p-2 space-y-4"> {/* Added flex-1 for scrolling, padding, and spacing */}
                 {/* Example AI Message Bubble */}
                 <div className="flex justify-start">
                     <div className="bg-gray-700 text-white p-3 rounded-lg max-w-[80%]"> {/* Darker gray background for AI */}
                         Operating systems are the unsung heroes of our digital lives, the foundational software that makes our computers, smartphones, and even smartwatches actually work. Think of an operating system, often abbreviated as OS, as the conductor of a digital orchestra.
                     </div>
                 </div>
                 {/* Example User Message Bubble */}
                 <div className="flex justify-end">
                     <div className="bg-lime-300 text-black p-3 rounded-lg max-w-[80%]"> {/* Lime background for User */}
                         Tell me more about file organization.
                     </div>
                 </div>
                  {/* Example AI Message Bubble 2 */}
                 <div className="flex justify-start">
                     <div className="bg-gray-700 text-white p-3 rounded-lg max-w-[80%]"> {/* Darker gray background for AI */}
                         The OS provides a structured way to organize and access files and directories, allowing users to store, retrieve, and manipulate their data effectively.
                     </div>
                 </div>
                 {/* Add more chat bubbles here */}
             </div>

             {/* Input Area */}
             {/* Positioned at the bottom, full width */}
             <div className="p-2"> {/* Padding around the input area */}
                 <div className="bg-black rounded-full flex items-center px-4 py-2 space-x-2"> {/* Dark background, rounded, flex layout */}
                     <Plus className="text-lime-300 w-6 h-6 cursor-pointer" /> {/* Plus icon */}
                     <Input
                         className="flex-1 bg-transparent border-none focus:ring-0 focus-visible:ring-0 text-white placeholder-gray-500" // Transparent background, no border/ring, white text
                         placeholder="ASK JONATHON" // Placeholder text
                     />
                     <Mic className="text-gray-400 w-6 h-6 cursor-pointer" /> {/* Microphone icon */}
                     <ArrowRight className="text-lime-300 w-6 h-6 cursor-pointer" /> {/* Send icon */}
                 </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
