"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, StickyNote } from "lucide-react";
import PdfCard from "@/components/PdfCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UppyUploader from "@/components/UppyUploader";// your uploader component
export default function Page() {
  const { isSignedIn, user } = useUser();
  const [pdfs, setPdfs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("pdfList");
    if (stored) setPdfs(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("pdfList", JSON.stringify(pdfs));
  }, [pdfs]);

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsDialogOpen(true);
    }
  };

  const handleUpload = () => {
    if (selectedFile && selectedType) {
      setPdfs((prev) => [
        ...prev,
        { name: selectedFile.name, type: selectedType },
      ]);
      setSelectedFile(null);
      setSelectedType(null);
      setIsDialogOpen(false);
    }
  };

  const handleDelete = (name) => {
    setPdfs((prev) => prev.filter((pdf) => pdf.name !== name));
  };

  return (
    <div className="bg-white flex flex-col">
      <h1 className="text-4xl font-light p-8 font-space-grotesk ">
        {user?.firstName ? `Welcome ${user.firstName}` : "Hello"}
      </h1>

      <div className="gap-2 p-4 items-center w-full flex justify-center">
        <Card className="border-2 border-black flex items-center justify-center w-full max-w-3xl shadow-lg bg-gradient-to-br from-white to-lime-50">
          <CardContent className="p-6">
            <Card className="bg-white border-2 border-lime-300 border-dashed p-12 flex justify-center w-full max-w-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-lime-50 opacity-20 rounded-full blur-3xl transform translate-x-1/2"></div>
              <Button
                onClick={handleButtonClick}
                className="w-fit text-sm p-6 bg-lime-500 text-black hover:bg-lime-600 border-2 border-black transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center gap-2 font-light rounded-xl"
              >
                Create New Path
                <PlusCircle className="animate-pulse" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="application/pdf"
              />
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Here is where you add Uppy uploader safely outside any buttons */}
     <div className="max-w-xl border-2 border-lime-300 bg-black ">
  <UppyUploader bucketName="pdfs" />
</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 p-4 justify-center gap-4">
        {pdfs.map((pdf, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <PdfCard
              key={index}
              name={pdf.name}
              type={pdf.type}
              onDelete={() => handleDelete(pdf.name)}
            />
          </motion.div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <DialogContent className="sm:max-w-[425px] space-y-4">
            <Card className="bg-lime-300 p-8 border-2 border-black">
              <div className="flex justify-center items-center flex-col">
                <StickyNote className="w-16 h-16 mb-2" />
                <h1 className="text-lg font-semibold">
                  {selectedFile?.name ?? "No file selected"}
                </h1>
              </div>
            </Card>

            <div className="flex flex-col space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="docType"
                  value="qp"
                  checked={selectedType === "qp"}
                  onChange={() => setSelectedType("qp")}
                  className="accent-lime-600"
                />
                <span>Question Paper</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="docType"
                  value="notes"
                  checked={selectedType === "notes"}
                  onChange={() => setSelectedType("notes")}
                  className="accent-lime-600"
                />
                <span>Notes</span>
              </label>
            </div>

            <Button onClick={handleUpload}>Upload</Button>
          </DialogContent>
        </motion.div>
      </Dialog>
    </div>
  );
}
