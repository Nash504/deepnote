'use client'
import Image from "next/image";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { ArrowRight, Plus, Mic, Sparkles, FileText } from "lucide-react";

import { useInView } from 'react-intersection-observer';

import { useState, useEffect } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInput, setUserInput] = useState("");
  
  // Multiple elements with different animation timings
  const { ref: mainRef, inView: mainInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { ref: chatRef, inView: chatInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Simulate typing effect for the example messages
  const [typingIndex, setTypingIndex] = useState(0);
  const exampleAIMessage = "Operating systems are the foundational software that makes our computers, smartphones, and even smartwatches actually work. ";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setIsLoaded(true);
    
    // Typing effect for AI message
    if (chatInView && typingIndex < exampleAIMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(exampleAIMessage.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 20);
      
      return () => clearTimeout(timeout);
    }
  }, [chatInView, typingIndex]);

  const mainAnimationClasses = mainInView
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-10';
    
  const chatAnimationClasses = chatInView
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-16';

  return (
    <div className={`bg-gradient-to-b from-black to-neutral-900 text-white font-space-grotesk min-h-screen p-4 sm:p-8 overflow-hidden`}>
      {/* Background particles/grid effect */}
    
      
      <div className={`relative z-10 flex flex-col -mt-10 lg:flex-row gap-12 max-w-6xl mx-auto transition-all duration-1000 ease-out ${mainAnimationClasses}`} ref={mainRef}>
        {/* Hero Content Section */}
        <div className="flex flex-col gap-8 items-center lg:items-start flex-1 mt-16 lg:mt-32">
          {/* Decorative element */}
         
          
          {/* Main heading with gradient */}
          <h1 className="font-bold text-4xl sm:text-6xl lg:text-7xl text-center lg:text-left leading-tight">
            <span className="bg-gradient-to-r from-lime-300 via-lime-300 to-lime-300 bg-clip-text text-transparent">Instant PDF</span> Answers.
            <br /> Study Smarter.
          </h1>
          
          {/* Subheading */}
          <p className="font-light text-xl text-center lg:text-left text-gray-300 max-w-lg">
            Query your study materials with AI. Unlock rapid understanding and pinpoint key information within your notes and texts. Fast, focused learning.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
            <Button className="bg-lime-400 hover:bg-lime-300 text-black font-bold text-lg py-6 px-8 rounded-full transition-all duration-300 ease-in-out w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg shadow-lime-400/20">
              Get Started
              <ArrowRight size={18} />
            </Button>
            
           
          </div>
          
          {/* Social proof */}

        </div>

        {/* Chat Interface Section */}
        <div className={`flex justify-center flex-1 mt-12 lg:mt-24 transition-all duration-1000 ease-out delay-300 ${chatAnimationClasses}`} ref={chatRef}>
          <Card className="w-full sm:max-w-md bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl shadow-lime-400/5 flex flex-col h-[600px] relative overflow-hidden border border-white/10">
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-lime-400"></div>
                <span className="font-medium text-white">Jonathon AI</span>
              </div>
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-white/30"></div>
                <div className="h-2 w-2 rounded-full bg-white/30"></div>
                <div className="h-2 w-2 rounded-full bg-white/30"></div>
              </div>
            </div>
            
            {/* Chat Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Example AI Message Bubble */}
              <div className={`flex justify-start gap-3 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="h-10 w-10 rounded-full bg-lime-400/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-lime-400" />
                </div>
                <div className="bg-neutral-800 text-sm text-white p-4 rounded-lg max-w-[80%]">
                  {displayedText}
                  {chatInView && typingIndex < exampleAIMessage.length && (
                    <span className="inline-block w-1 h-4 bg-lime-400 ml-1 animate-pulse"></span>
                  )}
                </div>
              </div>
              
              {/* Example User Message Bubble */}
              <div className={`flex justify-end gap-3 transition-all duration-500 delay-1000 ${isLoaded && chatInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="bg-lime-400 text-sm text-black p-4 rounded-lg max-w-[80%] font-medium">
                  Tell me more about file organization.
                </div>
                <div className="h-10 w-10 rounded-full bg-neutral-700 flex items-center justify-center">
                  <span className="text-xs font-bold">ME</span>
                </div>
              </div>
              
              {/* AI typing indicator */}
              <div className={`flex justify-start gap-3 transition-all duration-500 delay-1500 ${isLoaded && chatInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="h-10 w-10 rounded-full bg-lime-400/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-lime-400" />
                </div>
                <div className="bg-neutral-800 text-sm text-white p-4 rounded-lg">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-lime-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-lime-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-lime-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 relative">
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <div className="bg-black/60 backdrop-blur-md rounded-full flex items-center px-4 py-3 border border-white/10 shadow-lg">
                  <Plus className="text-lime-400 w-5 h-5 cursor-pointer hover:text-lime-300 transition-colors" />
                  <Input
                    className="flex-1 bg-transparent border-none focus:ring-0 focus-visible:ring-0 text-white placeholder-gray-500 px-3 py-1"
                    placeholder="Ask Johnathon..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <button type="button" className="text-gray-400 hover:text-gray-300 transition-colors">
                      <Mic className="w-5 h-5" />
                    </button>
                    <button 
                      type="submit" 
                      className={`flex items-center justify-center h-8 w-8 rounded-full ${userInput.length > 0 ? 'bg-lime-400 text-black' : 'bg-gray-700 text-gray-400'} transition-all duration-300`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
             
            </div>
          </Card>
        </div>
      </div>
      
      {/* Feature highlights section (condensed for visibility) */}
      <div className={`relative z-10 mt-24 max-w-6xl mx-auto transition-all duration-1000 ease-out ${mainInView ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-10'}`}>
       
      </div>
    </div>
  );
}