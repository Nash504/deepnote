// components/dashboard/CategoryToggle.jsx

"use client";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FolderOpen, FileText, BookOpen, Grid3X3, List } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase";
// 1. Import Skeleton component
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryToggle({
  type,
  setType,
  viewMode,
  setViewMode,
}) {
  const { user } = useUser();

  const [qpCount, setQpCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);
  // 2. Add loading state, initialized to true
  const [isLoading, setIsLoading] = useState(true);

  const handleViewChange = (newView) => {
    if (newView) {
      setViewMode(newView);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      if (!user) return;
      // Ensure loading is true at the start of a fetch
      setIsLoading(true);
      try {
        const userPath = `users/${user.id}/uploads`;

        const [qpList, nList] = await Promise.all([
          supabase.storage
            .from("question-papers")
            .list(userPath, { limit: 100 }),
          supabase.storage.from("notes").list(userPath, { limit: 100 }),
        ]);

        if (qpList.data) setQpCount(qpList.data.length);
        if (nList.data) setNotesCount(nList.data.length);
      } catch (error) {
        console.error("An error occurred while fetching files:", error);
      } finally {
        // 3. Set loading to false after fetch is complete (or fails)
        setIsLoading(false);
      }
    };
    fetchFiles();
  }, [user]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      {/* Group 1: Category Toggles */}
      <ToggleGroup
        type="single"
        value={type}
        onValueChange={(value) => value && setType(value)}
        className="flex flex-wrap justify-center gap-2 sm:gap-4"
      >
        <ToggleGroupItem value="all" aria-label="All PDFs">
          <FolderOpen className="w-4 h-4 mr-2" />
          All <span className="hidden sm:inline ml-1">PDFs</span>
          {/* 4. Conditionally render Skeleton for the counts */}
          {isLoading ? (
            <Skeleton className="h-4 w-10 inline-block ml-2" />
          ) : (
            <span className="ml-1">({qpCount + notesCount})</span>
          )}
        </ToggleGroupItem>

        <ToggleGroupItem value="notes" aria-label="Notes">
          <FileText className="w-4 h-4 mr-2" />
          Notes
          {isLoading ? (
            <Skeleton className="h-4 w-8 inline-block ml-2" />
          ) : (
            <span className="ml-1">({notesCount})</span>
          )}
        </ToggleGroupItem>

        <ToggleGroupItem value="question-papers" aria-label="Question Papers">
          <BookOpen className="w-4 h-4 mr-2" />
          Q. Papers
          {isLoading ? (
            <Skeleton className="h-4 w-8 inline-block ml-2" />
          ) : (
            <span className="ml-1">({qpCount})</span>
          )}
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Group 2: View Mode Toggles (No skeleton needed here as it's not data-dependent) */}
      <div className="flex border border-border rounded-md">
        <Button
          variant={viewMode === "grid" ? "default" : "ghost"}
          size="sm"
          onClick={() => setViewMode("grid")}
          className="rounded-r-none"
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "ghost"}
          size="sm"
          onClick={() => setViewMode("list")}
          className="rounded-l-none"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
