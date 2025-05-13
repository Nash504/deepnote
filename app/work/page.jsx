"use client";

import { useState, useRef, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";





export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();

  // 1. Create a reference to the hidden input
  const fileInputRef = useRef(null);

  // 2. Button click handler to trigger the hidden input
  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Safe call to open file picker
  };

  // 3. When a file is chosen
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // Optional: do something with the file here
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {user?.firstName ? (
        <h1 className="text-4xl font-bold p-8">Welcome {user.firstName}</h1>
      ) : (
        <h1 className="text-4xl font-bold p-8">Hello</h1>
      )}

      <div className="flex flex-col sm:flex-row justify-center items-center">
        <Card className="p-8 m-4 border-2 border-black">
          <CardContent>
            <Card className="bg-white border-2 border-lime-300 border-dashed p-8">
              
              {/* 4. File Upload Button */}
              <Button
                onClick={handleButtonClick}
                className="bg-lime-500 text-black hover:bg-lime-600 border-2 border-black transition-transform duration-200 hover:scale-105"
              >
                Create New Project
                <ArrowUp />
              </Button>

              {/* 5. Hidden Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept='application/pdf'
              />
            </Card>
          </CardContent>
        </Card>






          <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div>
    </div>
  );
}
