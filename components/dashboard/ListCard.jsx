"use client";
import {
  StickyNote,
  Eye,
  Download,
  EllipsisVertical,
  Plus,
  MessageSquare,
  BookOpen,
  FileText,
  MoreVertical,
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
import { Badge } from "../ui/badge";

export default function ListCard({
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

      // Call the onFileDeleted callback to refresh the file list
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
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
  };

  const getBadgeStyle = () => {
    if (typeLabel === "notes") {
      return "bg-blue-50 text-blue-600 border-blue-200";
    } else {
      return "bg-purple-50 text-purple-600 border-purple-200";
    }
  };

  const getIconStyle = () => {
    if (typeLabel === "notes") {
      return "bg-blue-50 text-blue-500";
    } else {
      return "bg-purple-50 text-purple-500";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get file extension
  const getFileExtension = () => {
    if (!name) return "";
    const parts = name.split(".");
    return parts.length > 1 ? parts.pop().toUpperCase() : "";
  };

  return (
    <div className="w-full">
      <Card
        className={`border border-gray-100 rounded-xl transition-all duration-300 overflow-hidden bg-white
          ${
            isHovered
              ? "shadow-md transform translate-x-0"
              : "shadow-sm hover:border-gray-200"
          }
          ${
            typeLabel === "notes"
              ? "hover:border-blue-100"
              : "hover:border-purple-100"
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Left side: File Icon & Info */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div
                className={`h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                  ${
                    typeLabel === "notes"
                      ? isHovered
                        ? "bg-blue-100"
                        : "bg-blue-50"
                      : isHovered
                      ? "bg-purple-100"
                      : "bg-purple-50"
                  }`}
                onClick={() => setMainDialogOpen(true)}
              >
                <div className="flex flex-col items-center">
                  <FileText
                    className={`h-6 w-6 transition-all duration-300
                      ${
                        typeLabel === "notes"
                          ? "text-blue-600"
                          : "text-purple-600"
                      } ${isHovered ? "scale-110" : ""}`}
                  />
                  <span className="text-[10px] mt-1 font-medium px-1.5 py-0.5 rounded bg-white/80">
                    {getFileExtension()}
                  </span>
                </div>
              </div>

              <div
                className="min-w-0 flex-1 cursor-pointer"
                onClick={() => setMainDialogOpen(true)}
              >
                <div className="flex items-center">
                  <h3
                    className="font-medium text-gray-800 truncate mr-2"
                    title={name}
                  >
                    {name}
                  </h3>
                  <Badge
                    className={`text-[10px] py-0.5 px-2 font-medium ${getBadgeStyle()} hidden sm:flex`}
                  >
                    {typeLabel === "question-papers"
                      ? "Question Paper"
                      : "Notes"}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
                  <span className="flex items-center">
                    <svg
                      className="w-3 h-3 mr-1.5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {formatDate(createdAt)}
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-3 h-3 mr-1.5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                      />
                    </svg>
                    {formatBytes(size)}
                  </span>
                  <Badge
                    className={`text-[10px] py-0.5 px-2 font-medium ${getBadgeStyle()} sm:hidden`}
                  >
                    {typeLabel === "question-papers"
                      ? "Question Paper"
                      : "Notes"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <Button
                variant="ghost"
                size="sm"
                className={`text-gray-600 hover:bg-gray-100/80 hover:text-primary rounded-lg transition-all duration-300 ${
                  isHovered ? "bg-gray-50/80" : ""
                }`}
                onClick={() => {
                  const url = getPdfUrl();
                  if (url) window.open(url, "_blank");
                }}
              >
                <Eye className={`h-4 w-4 ${isHovered ? "text-primary" : ""}`} />
                <span className="hidden sm:inline ml-2 text-sm">View</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={`text-gray-600 hover:bg-gray-100/80 hover:text-primary rounded-lg transition-all duration-300 ${
                  isHovered ? "bg-gray-50/80" : ""
                }`}
              >
                <Download
                  className={`h-4 w-4 ${isHovered ? "text-primary" : ""}`}
                />
                <span className="hidden sm:inline ml-2 text-sm">Download</span>
              </Button>

              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 rounded-lg transition-all duration-300 ${
                      isHovered ? "bg-gray-50/80 text-primary" : "text-gray-500"
                    }`}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 p-1">
                  <DropdownMenuItem className="text-sm rounded-md cursor-pointer transition-colors hover:bg-gray-100">
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm rounded-md cursor-pointer transition-colors hover:bg-gray-100">
                    Move
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 text-sm rounded-md cursor-pointer transition-colors hover:bg-red-50"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
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

      {/* File action dialog */}
      <Dialog open={maindialogOpen} onOpenChange={setMainDialogOpen}>
        <DialogContent className="sm:max-w-[500px] p-6 rounded-xl">
          <div className="text-left">
            <div className="flex items-center space-x-3 mb-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  typeLabel === "notes"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                <FileText className="w-5 h-5" />
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
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${getBadgeStyle()}`}
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
    </div>
  );
}
