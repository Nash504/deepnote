// components/dashboard/CategoryToggle.jsx

"use client";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FolderOpen, FileText, BookOpen } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase"; // make sure supabase is imported

export default function CategoryToggle({ type, setType }) {
  const { user } = useUser();

  const [qpCount, setQpCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);

  const fetchFiles = async () => {
    try {
      const userPath = `users/${user.id}/uploads`;

      const [qpList, nList] = await Promise.all([
        supabase.storage.from("question-papers").list(userPath, { limit: 100 }),
        supabase.storage.from("notes").list(userPath, { limit: 100 }),
      ]);

      if (!qpList.error && qpList.data) {
        setQpCount(qpList.data.length);
      } else {
        console.error("Error loading question papers:", qpList.error);
      }

      if (!nList.error && nList.data) {
        setNotesCount(nList.data.length);
      } else {
        console.error("Error loading notes:", nList.error);
      }
    } catch (error) {
      console.error("An error occurred while fetching files:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user]);

  return (
    <ToggleGroup
      type="single"
      value={type}
      onValueChange={(value) => value && setType(value)}
      className="flex flex-wrap gap-4 sm:gap-6"
    >
      {/* All PDFs */}
      <ToggleGroupItem
        value="all"
        className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base"
      >
        <FolderOpen className="w-5 h-5" />
        All PDFs{" "}
        <span className="text-xs text-gray-500">({qpCount + notesCount})</span>
      </ToggleGroupItem>

      {/* Notes */}
      <ToggleGroupItem
        value="notes"
        className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base"
      >
        <FileText className="w-5 h-5" />
        Notes <span className="text-xs text-gray-500">({notesCount})</span>
      </ToggleGroupItem>

      {/* Question Papers */}
      <ToggleGroupItem
        value="question-papers"
        className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base"
      >
        <BookOpen className="w-5 h-5" />
        Question Papers{" "}
        <span className="text-xs text-gray-500">({qpCount})</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
