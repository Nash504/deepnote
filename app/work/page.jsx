"use client";

import { useState, useRef,useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, StickyNote } from 'lucide-react';
import PdfCard from "@/components/PdfCard";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";



export default function Page() {
  const { isSignedIn, user } = useUser();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null); // <-- NEW
    const [pdfs, setPdfs] = useState([
 
  ]);



  useEffect(() => {
  const stored = localStorage.getItem("pdfList");
  if (stored) setPdfs(JSON.parse(stored));
}, []);

useEffect(() => {
  localStorage.setItem("pdfList", JSON.stringify(pdfs));
}, [pdfs]);
  

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

const handleDelete = (name) => {
  setPdfs(pdfs.filter((pdf)=>(pdf.name!==name)));
  localStorage.setItem("pdfList", JSON.stringify(pdfs));
  setIsDialogOpen(false);
}





  const handleUpload = () => {
    if (selectedFile && selectedType) {

      // Reset the state
      setSelectedFile(null);
      setSelectedType(null);
      setIsDialogOpen(false);

      // Optionally, you can add the new PDF to the list
      setPdfs((prevPdfs) => [...prevPdfs, { name: selectedFile.name, type: selectedType }]);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-poppins">
      {user?.firstName ? (
        <h1 className="text-4xl font-bold p-8">Welcome {user.firstName}</h1>
      ) : (
        <h1 className="text-4xl font-bold p-8">Hello</h1>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-4">
        <Card className="border-2 border-black items-center justify-center">
          <CardContent className="p-2">
            <Card className="bg-white border-2 border-lime-300 border-dashed p-8  flex justify-center">
              <Button
                onClick={handleButtonClick}
                className="w-fit text-sm bg-lime-500 text-black hover:bg-lime-600 border-2 border-black transition-transform duration-200 hover:scale-105 flex items-center gap-2"
              >
                Create New Path
                <PlusCircle />
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
      
        {pdfs.map((pdf, index) => (
          <PdfCard
            key={index}
            name={pdf.name}
            type={pdf.type}
            onDelete={()=>handleDelete(pdf.name)}
          />
        ))} 
        

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

            <Button onClick={handleUpload}>Upload</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
