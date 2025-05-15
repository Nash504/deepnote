// components/PdfCard.jsx
import { Card } from "@/components/ui/card";
import { StickyNote } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";

export default function PdfCard({ name, type, onDelete }) {
  const color = type === "notes" ? "bg-green-500" : "bg-orange-500";
  const label = type === "notes" ? "Notes" : "Question Paper";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const handleClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <Card className="bg-lime-300 p-8 border-2 border-black">
            <div className="flex justify-center items-center flex-col">
              <StickyNote className="w-16 h-16 mb-2" />
              <h1 className="text-md font-semibold">{name ?? "No file selected"}</h1>
            </div>
          </Card>
          <Button onClick={() => setIsDeleteOpen(true)}>Delete PDF</Button>
          <Button>View Questions</Button>
          <Button>View Answers</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <h1>Delete {name}?</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                onDelete();
                setIsDeleteOpen(false);
                setIsDialogOpen(false);
              }}
            >
              Delete
            </Button>
            <Button onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

  <Card 
        onClick={handleClick} 
        className="p-8 m-4 border-2 border-black hover:-translate-y-2 hover:translate-x-2 transition-all duration-200 ease-in-out hover:border-l-8 hover:border-b-8"
      >
        <div className="flex flex-col items-end gap-2">
          <h1 className="font-semibold text-lg">Example Course</h1>
          <span className={`text-white font-bold w-fit border-2 border-black px-2 py-1 rounded-2xl bg-blue-500 ${color}`}>
            {type}
          </span>
        </div>
      </Card>
    
    </>
  );
}
