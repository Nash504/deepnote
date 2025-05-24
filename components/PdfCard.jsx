"use client";
import {
  StickyNote,
  Eye,
  Download,
  EllipsisVertical,
  Plus,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PdfCard({ name, type, createdAt }) {
  const typeLabel = type === "notes" ? "notes" : "question-papers";
  const badgeColor = "bg-gray-100";
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [maindialogOpen, setMainDialogOpen] = useState(false);

  const handleDelete = async () => {
    const { data, error } = await supabase.storage
      .from(`${typeLabel}`)
      .remove([`uploads/${name}`]);

    if (error) {
      console.error("Failed to delete PDF:", error);
      console.log("Error deleting PDF:", typeLabel);
    } else {
      console.log("PDF deleted successfully.");
      setDialogOpen(false);
      // optionally remove the card from UI
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDialogOpen(true);
    setDropdownOpen(false); // Close dropdown when opening dialog
  };

  const getPdfUrl = () => {
    const { data } = supabase.storage
      .from(typeLabel)
      .getPublicUrl(`uploads/${name}`);
    return data?.publicUrl;
  };

  return (
    <div className="flex flex-col items-center">
      <Card
        onClick={() => setMainDialogOpen(true)}
        className="w-80 h-96 border-2 border-gray-200 shadow-md rounded-xl flex flex-col"
      >
        {/* Top Tag and Menu */}
        <CardHeader className="flex justify-between items-center">
          <span
            className={`text-sm px-3 py-1 rounded-2xl font-medium border border-gray-300 ${badgeColor}`}
          >
            {typeLabel}
          </span>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <EllipsisVertical className="w-5 h-5 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
              <DropdownMenuItem className="cursor-pointer">
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => alert("Change Category")}
              >
                Change Category
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteClick}
                className="cursor-pointer text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this {name}?
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleDelete}>Delete</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={maindialogOpen} onOpenChange={setMainDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <div className="text-left">
              <h2 className="text-lg font-semibold mb-4">{name}</h2>
              <span
                className={`text-sm px-3 py-1 rounded-2xl font-medium border border-gray-300 ${badgeColor}`}
              >
                {typeLabel}
              </span>
            </div>
            {typeLabel==="question-papers" ?
            <div className="flex flex-col gap-4 justify-between mt-4">
              <Button>
                <BookOpen size={18} /> View Flashcards
              </Button>
              <Button variant="outline">
                <MessageSquare size={18} /> Chat with PDF
              </Button>
            </div>:
             <div className="flex flex-col gap-4 justify-between mt-4">
              <Button>
                <BookOpen size={18} /> View Questions
              </Button>
              <Button variant="outline">
                <MessageSquare size={18} /> View Answers
              </Button>
            </div>}
          </DialogContent>
        </Dialog>

        {/* Icon area */}
        <div className="flex justify-center items-center bg-neutral-200 mx-8 rounded-xl py-8 mt-2">
          <StickyNote className="w-12 h-12" />
        </div>

        {/* Title and Date */}
        <CardContent className="mt-4 px-6 text-left gap-2">
          <h1 className="font-bold text-2xl truncate">{name ?? "Untitled"}</h1>
          <p className="text-sm mt-1">
            Uploaded on {createdAt?.split("T")[0]}
          </p>
        </CardContent>

        {/* View/Download Buttons */}
        <div className="flex justify-around mt-auto mb-4 px-4">
          <Button
            variant="ghost"
            className="flex gap-2 text-black"
            onClick={() => {
              const url = getPdfUrl();
              window.open(url, "_blank");
            }}
          >
            <Eye size={18} /> View
          </Button>
          <Button variant="ghost" className="flex gap-2 text-black">
            <Download size={18} /> Download
          </Button>
        </div>
      </Card>
    </div>
  );
}