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

export default function ListCard({ name, type, createdAt, size }) {
  const typeLabel = type === "notes" ? "notes" : "question-papers";
  const badgeColor = "bg-gray-100";
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [maindialogOpen, setMainDialogOpen] = useState(false);
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
      // optionally remove the card from UI, e.g., by calling a function passed via props
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

  return (
    <div className="flex flex-col items-center w-full">
      <Card className="w-full hover:shadow-md transition-all duration-200 border-border/50">
        <CardContent className="p-4">
          {/* Main container: stacks vertically on mobile, row on medium screens up */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left side: File Info */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0">
                {" "}
                {/* Prevents text from overflowing its container */}
                <h3
                  className="font-semibold text-foreground truncate"
                  title={name}
                >
                  {name}
                </h3>
                {/* Metadata container: wraps nicely on small screens */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                  <span>Uploaded on {createdAt}</span>
                  <span>Size: {formatBytes(size)}</span>
                  <Badge variant="outline" className="text-xs">
                    {typeLabel}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right side: Action Buttons */}
            {/* Aligns to the end on mobile, centered in its space on desktop */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground"
                onClick={() => {
                  const url = getPdfUrl();
                  if (url) window.open(url, "_blank");
                }}
              >
                <Eye size={18} />
                {/* Text label hidden on small screens */}
                <span className="hidden sm:inline ml-2">View</span>
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-accent/10">
                <Download className="h-4 w-4" />
                {/* Text label hidden on small screens */}
                <span className="hidden sm:inline ml-2">Download</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem>Move</DropdownMenuItem>
                  {/* It's better to handle the delete click directly here */}
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <div className="text-center">
                    <h2 className="text-lg font-semibold mb-4">
                      Are you sure?
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                      Are you sure you want to delete this {name}?
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleDelete}>Delete</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note: Your Dialog for deletion would go here if needed, but it's not in the original return statement */}
      {/* Example:
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          ... Your delete confirmation UI ...
          <Button variant="destructive" onClick={handleDelete}>Confirm Delete</Button>
        </DialogContent>
      </Dialog>
      */}
    </div>
  );
}
