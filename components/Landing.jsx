'use client'
import Image from "next/image";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { BorderBeam } from "./magicui/border-beam";

export default function Home() {
  return (
    <div className="bg-black font-space-grotesk gap-[32px] justify-start min-h-screen p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col gap-[32px] items-center lg:items-start flex-1">
          {/* Main heading */}
          <h1 className="font-bold text-white text-4xl sm:text-5xl text-center lg:text-left animate-fade-in-down">
            Instant PDF Answers. Study Smarter.
          </h1>
          {/* Subheading */}
          <p className="font-light text-white text-xl sm:text-2xl text-center lg:text-left animate-fade-in">
            Query your study materials with AI. Unlock rapid understanding and pinpoint key information within your notes and texts. Fast, focused learning.
          </p>
          <Button className="bg-lime-300 text-black font-bold py-2 px-4 p-6 rounded-4xl hover:bg-lime-400 transition duration-300 ease-in-out w-full sm:w-auto mt-4 lg:mt-0 animate-bounce-in">
            Get Started
          </Button>
        </div>
        <div className="flex justify-center flex-1 mt-8 lg:mt-0">
          <Card className="w-full max-w-[350px] border-lime-300 border-4 bg-neutral-950 animate-fade-in-up">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      {/* Animation keyframes (add to your global CSS or Tailwind config) */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.8);}
          60% { opacity: 1; transform: scale(1.05);}
          100% { opacity: 1; transform: scale(1);}
        }
        .animate-fade-in { animation: fade-in 1s ease forwards; }
        .animate-fade-in-down { animation: fade-in-down 1s 0.1s cubic-bezier(.39,.575,.565,1) both; }
        .animate-fade-in-up { animation: fade-in-up 1s 0.2s cubic-bezier(.39,.575,.565,1) both; }
        .animate-bounce-in { animation: bounce-in 0.7s 0.3s cubic-bezier(.39,.575,.565,1) both; }
      `}</style>
    </div>
  );
}
