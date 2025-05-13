"use client";

import { useState, useRef } from 'react';
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, StickyNote } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function Page() {
  const { isSignedIn, user } = useUser();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null); // <-- NEW

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsDialogOpen(true);
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
              <Button
                onClick={handleButtonClick}
                className="bg-lime-500 text-black hover:bg-lime-600 border-2 border-black transition-transform duration-200 hover:scale-105"
              >
                Create New Path
                <ArrowUp />
              </Button>
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <Card className="bg-lime-300 p-8 border-2 border-black">
              <div className="flex justify-center items-center flex-col">
                <StickyNote className="w-16 h-16 mb-2" />
                <h1 className="text-lg font-semibold">{selectedFile?.name ?? "No file selected"}</h1>
              </div>
            </Card>

            {/* Radio-style selection */}
            <div className="flex flex-col space-y-2 pt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="docType"
                  value="qp"
                  checked={selectedType === 'qp'}
                  onChange={() => setSelectedType('qp')}
                  className="accent-lime-600"
                />
                <span>Question Paper</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="docType"
                  value="notes"
                  checked={selectedType === 'notes'}
                  onChange={() => setSelectedType('notes')}
                  className="accent-lime-600"
                />
                <span>Notes</span>
              </label>
            </div>

            <Button>Upload</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
