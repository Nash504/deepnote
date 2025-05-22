"use client";
import { StickyNote, Eye, Download,EllipsisVertical } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export default function PdfCard({ name, type,createdAt }) {
  const typeLabel = type == "notes" ? "notes" : "question papers";
  const badgeColor = type === "notes" ? "bg-gray-100" : "bg-gray-100";

  return (
    <div className="flex flex-col items-center">
      <Card className="w-80 h-96 border-2 border-gray-200 shadow-md rounded-xl flex flex-col">
        {/* Top Tag and Menu */}
        <CardHeader className="flex justify-between items-center">
          <span
            className={`text-sm px-3 py-1 rounded-fulls rounded-2xl font-medium border border-gray-300 ${badgeColor}`}
          >
            {typeLabel}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger>
         <EllipsisVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Change Category
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        {/* Icon area */}
        <div className="flex justify-center items-center bg-neutral-200 mx-8 rounded-xl py-8 mt-2">
          <StickyNote className="w-12 h-12" />
        </div>

        {/* Title and Date */}
       <CardContent className="mt-4 px-6 text-left gap-2 ">
  <h1 className="font-bold text-2xl truncate">{name ?? "Untitled"}</h1>
  <p className="text-sm mt-1">Uploaded on {createdAt?.split("T")[0]}</p>
</CardContent>


        {/* View/Download Buttons */}
        <div className="flex justify-around mt-auto mb-4 px-4">
          <Button variant="ghost" className="flex gap-2 text-black">
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
