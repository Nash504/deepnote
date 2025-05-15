// components/PdfCard.jsx
import { Card } from "@/components/ui/card";
import { StickyNote } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";

export default function PdfCard({ name, type, onDelete }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const typeLabel = type === "notes" ? "Notes" : "Question Paper";
  const badgeColor = type === "notes" ? "bg-lime-500" : "bg-black";

  return (
    <>
      {/* Main View Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] space-y-4">
          <Card className="bg-lime-300 p-8 border-2 border-black">
            <div className="flex flex-col justify-center items-center ">
              <StickyNote className="w-16 h-16 mb-2" />
              <h1 className="text-md font-semibold">{name ?? "No file selected"}</h1>
            </div>
          </Card>
          <div className="flex flex-col sm:flex-row gap-2 justify-end">
            <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>Delete</Button>
            {type === "notes" ? (
              <>
                <Button>View FlashCards</Button>
                <Button>Chat with PDF</Button>
              </>
            ) : (
              <>
              <Button>View Questions</Button>
              <Button>View Answers</Button>
              </>
            )}
    
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px] space-y-4">
          <h1 className="text-lg font-semibold">Delete "{name}"?</h1>
          <div className="flex gap-2 justify-end">
            <Button
              variant="destructive"
              onClick={() => {
                onDelete();
                setIsDeleteOpen(false);
                setIsDialogOpen(false);
              }}
            >
              Confirm
            </Button>
            <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Card Preview */}
      <Card
        onClick={() => setIsDialogOpen(true)}
        className="p-8 m-4 border-2 border-black hover:-translate-y-2 hover:translate-x-2 duration-100 ease-in-out hover:border-l-8 hover:border-b-8 shadow-lg backdrop-blur-sm rounded-lg cursor-pointer"
      >
        <div className="flex flex-col items-end gap-2">
          <h1 className="font-semibold text-lg">{name}</h1>
          <span className={`text-white font-bold w-fit border-2 border-black px-2 py-1 rounded-2xl ${badgeColor}`}>
            {typeLabel}
          </span>
        </div>
      </Card>
    </>
  );
}
