import Image from "next/image";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { BorderBeam } from "./magicui/border-beam";

export default function Home() {
  return (
    <div className="bg-black text-white font-space-grotesk gap-[32px] justify-start min-h-screen p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col gap-[32px] items-center lg:items-start flex-1">
          {/* Main heading */}
          <h1 className="font-bold text-4xl sm:text-5xl text-center lg:text-left">
            Instant PDF Answers. Study Smarter.
          </h1>
          {/* Subheading */}
          <p className="font-light text-xl sm:text-2xl text-center lg:text-left">
          Query your study materials with AI. Unlock rapid understanding and pinpoint key information within your notes and texts. Fast, focused learning.
          </p>
          <Button className="bg-lime-300 text-black font-bold text- py-2 px-4 p-6 rounded-4xl hover:bg-lime-400 transition duration-300 ease-in-out w-full sm:w-auto mt-4 lg:mt-0">
            Get Started
          </Button>
        </div>
        <div className="flex justify-center flex-1 mt-8 lg:mt-0">
          <Card className="w-full max-w-[350px]">
           {/* IM GAY Take TURN LEft cloaset */}
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
    </div>
  );
}
