"use client";
import {
  StickyNote,
  Eye,
  Download,
  EllipsisVertical,
  Plus,
  MessageSquare,
  BookOpen,
  Clock,
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
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function PdfCard({
  name,
  type,
  createdAt,
  size,
  onFileDeleted,
}) {
  const typeLabel = type === "notes" ? "notes" : "question-papers";
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [maindialogOpen, setMainDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  const handleDelete = async () => {
    const { data, error } = await supabase.storage
      .from(`${typeLabel}`)
      .remove([`users/${userId}/uploads/${name}`]);

    if (error) {
      console.error("Failed to delete PDF:", error);
      console.log("Error deleting PDF:", typeLabel);
    } else {
      console.log("PDF deleted successfully.");
      setDialogOpen(false);

      // Notify parent component about deletion
      if (onFileDeleted) {
        onFileDeleted();
      }
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
      .getPublicUrl(`users/${userId}/uploads/${name}`);
    return data?.publicUrl;
  };

  const formatBytes = (bytes) => {
    if (!bytes) return "";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
  };

  // Get file extension and customize icon color based on type
  const getFileExtension = () => {
    if (!name) return "";
    const parts = name.split(".");
    return parts.length > 1 ? parts.pop().toUpperCase() : "";
  };

  const fileExtension = getFileExtension();

  const getBadgeColor = () => {
    if (typeLabel === "notes") {
      return "bg-blue-50 text-blue-600 border-blue-200";
    } else {
      return "bg-purple-50 text-purple-600 border-purple-200";
    }
  };

  const getIconColor = () => {
    if (typeLabel === "notes") {
      return "text-blue-500";
    } else {
      return "text-purple-500";
    }
  };

  return (
    <div className="w-full">
      <Card
        className={`h-96 border border-gray-200 rounded-xl flex flex-col overflow-hidden transition-all duration-300
                  ${
                    isHovered
                      ? "shadow-lg transform scale-[1.02]"
                      : "shadow-sm hover:shadow-md"
                  }
                  ${
                    typeLabel === "notes"
                      ? "bg-gradient-to-b from-white to-blue-50/30"
                      : "bg-gradient-to-b from-white to-purple-50/30"
                  }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Tag and Menu */}
        <CardHeader className="flex justify-between items-center pt-4 pb-0 px-6">
          <span
            className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all ${getBadgeColor()} ${
              isHovered ? "shadow-sm" : ""
            }`}
          >
            {typeLabel === "question-papers" ? "Question Paper" : "Notes"}
          </span>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 rounded-full transition-colors ${
                  isHovered ? "bg-white shadow-sm" : ""
                }`}
              >
                <EllipsisVertical
                  className={`w-4 h-4 ${
                    isHovered ? getIconColor() : "text-gray-500"
                  }`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-1.5" align="end">
              <DropdownMenuItem className="cursor-pointer rounded-md transition-all hover:bg-gray-100">
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer rounded-md transition-all hover:bg-gray-100"
                onClick={() => alert("Change Category")}
              >
                Change Category
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteClick}
                className="cursor-pointer text-red-600 rounded-md transition-all hover:bg-red-50"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[425px] rounded-xl border-none shadow-2xl">
            <div className="text-center py-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <StickyNote className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Delete File</h2>
              <p className="text-sm text-gray-600 mb-6 max-w-[320px] mx-auto">
                Are you sure you want to delete "
                <span className="font-medium">{name}</span>"? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="min-w-[100px]"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="min-w-[100px] bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={maindialogOpen} onOpenChange={setMainDialogOpen}>
          <DialogContent className="sm:max-w-[500px] p-6 rounded-xl">
            <div className="text-left">
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${getIconColor()
                    .replace("text-", "bg-")
                    .replace("-500", "-100")}`}
                >
                  <StickyNote className={`w-5 h-5 ${getIconColor()}`} />
                </div>
                <div>
                  <h2
                    className="text-lg font-semibold truncate max-w-[350px]"
                    title={name}
                  >
                    {name}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${getBadgeColor()}`}
                    >
                      {typeLabel === "question-papers"
                        ? "Question Paper"
                        : "Notes"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatBytes(size)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg my-4">
              <p className="text-sm text-gray-600">
                {typeLabel === "question-papers"
                  ? "Use this question paper to practice or prepare for your exams. You can view flashcards or chat with the PDF for better understanding."
                  : "Access your notes for study or review. View questions and answers to test your knowledge."}
              </p>
            </div>
            {typeLabel === "question-papers" ? (
              <div className="flex flex-col gap-3 justify-between mt-4">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md">
                  <BookOpen className="mr-2 h-4 w-4" /> View Flashcards
                </Button>
                <Link href="/work/chat" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> Chat with PDF
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 justify-between mt-4">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md">
                  <BookOpen className="mr-2 h-4 w-4" /> View Questions
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> View Answers
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Icon area */}
        <div
          className={`flex justify-center items-center mx-6 rounded-xl py-10 mt-4 transition-all duration-300 cursor-pointer
                    ${
                      isHovered
                        ? typeLabel === "notes"
                          ? "bg-blue-50/80"
                          : "bg-purple-50/80"
                        : "bg-gray-50/80"
                    }`}
          onClick={() => setMainDialogOpen(true)}
        >
          <div className="flex flex-col items-center relative">
            <div
              className={`w-20 h-20 flex items-center justify-center rounded-xl transition-all duration-300
              ${
                isHovered
                  ? typeLabel === "notes"
                    ? "bg-gradient-to-br from-blue-100 to-blue-50 shadow-md rotate-3"
                    : "bg-gradient-to-br from-purple-100 to-purple-50 shadow-md -rotate-3"
                  : "bg-white shadow-sm"
              }`}
            >
              <StickyNote
                className={`w-9 h-9 ${getIconColor()} transition-all duration-300 ${
                  isHovered ? "scale-110" : ""
                }`}
              />
            </div>
            <span className="text-xs font-medium mt-3 px-3.5 py-1 rounded-md bg-white shadow-sm border border-gray-100">
              {fileExtension}
            </span>
          </div>
        </div>

        {/* Title and Date */}
        <CardContent className="mt-3 px-6 text-left">
          <h1 className="font-medium text-lg truncate" title={name}>
            {name ?? "Untitled"}
          </h1>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500 flex items-center">
              <Clock className="w-3 h-3 mr-1.5 inline" />
              {createdAt
                ? new Date(createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Unknown date"}
            </p>
            <p className="text-xs font-medium text-gray-500">
              {formatBytes(size)}
            </p>
          </div>
        </CardContent>

        {/* View/Download Buttons */}
        <div className="flex justify-between mt-auto mb-4 px-6 border-t border-gray-100 pt-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex gap-1.5 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors font-medium`}
            onClick={() => {
              const url = getPdfUrl();
              window.open(url, "_blank");
            }}
          >
            <Eye size={15} /> View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-1.5 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors font-medium"
          >
            <Download size={15} /> Download
          </Button>
        </div>
      </Card>
    </div>
  );
}
