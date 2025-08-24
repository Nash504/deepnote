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
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-5">
      {/* Group 1: Category Toggles with Enhanced Design */}
      <div className="p-1.5 bg-white/80 backdrop-blur-sm rounded-xl w-full sm:w-auto border border-gray-100 shadow-sm">
        <ToggleGroup
          type="single"
          value={type}
          onValueChange={(value) => value && setType(value)}
          className="flex flex-wrap justify-center gap-1.5"
        >
          <ToggleGroupItem
            value="all"
            aria-label="All PDFs"
            className="data-[state=on]:bg-gradient-to-b data-[state=on]:from-gray-50 data-[state=on]:to-white data-[state=on]:shadow-md rounded-lg px-5 py-3 transition-all duration-300 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <div
                className={`rounded-full p-1.5 ${
                  type === "all"
                    ? "bg-indigo-50 text-indigo-600"
                    : "bg-gray-100 text-gray-600"
                } transition-colors duration-300`}
              >
                <FolderOpen className="w-4 h-4" />
              </div>
              <div className="ml-2.5">
                <span className="font-medium">All</span>{" "}
                <span className="hidden sm:inline">PDFs</span>
              </div>
              {/* Conditionally render Skeleton for the counts */}
              {isLoading ? (
                <Skeleton className="h-5 w-10 inline-block ml-2 rounded-full" />
              ) : (
                <span
                  className={`ml-2 px-2.5 py-0.5 text-xs rounded-full font-medium transition-colors duration-300 
                  ${
                    type === "all"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {qpCount + notesCount}
                </span>
              )}
            </div>
          </ToggleGroupItem>

          <ToggleGroupItem
            value="notes"
            aria-label="Notes"
            className="data-[state=on]:bg-gradient-to-b data-[state=on]:from-blue-50 data-[state=on]:to-white data-[state=on]:shadow-md rounded-lg px-5 py-3 transition-all duration-300 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <div
                className={`rounded-full p-1.5 ${
                  type === "notes"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-100 text-gray-600"
                } transition-colors duration-300`}
              >
                <FileText className="w-4 h-4" />
              </div>
              <div className="ml-2.5">
                <span className="font-medium">Notes</span>
              </div>
              {isLoading ? (
                <Skeleton className="h-5 w-8 inline-block ml-2 rounded-full" />
              ) : (
                <span
                  className={`ml-2 px-2.5 py-0.5 text-xs rounded-full font-medium transition-colors duration-300
                  ${
                    type === "notes"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {notesCount}
                </span>
              )}
            </div>
          </ToggleGroupItem>

          <ToggleGroupItem
            value="question-papers"
            aria-label="Question Papers"
            className="data-[state=on]:bg-gradient-to-b data-[state=on]:from-purple-50 data-[state=on]:to-white data-[state=on]:shadow-md rounded-lg px-5 py-3 transition-all duration-300 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <div
                className={`rounded-full p-1.5 ${
                  type === "question-papers"
                    ? "bg-purple-50 text-purple-600"
                    : "bg-gray-100 text-gray-600"
                } transition-colors duration-300`}
              >
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="ml-2.5">
                <span className="font-medium">Q. Papers</span>
              </div>
              {isLoading ? (
                <Skeleton className="h-5 w-8 inline-block ml-2 rounded-full" />
              ) : (
                <span
                  className={`ml-2 px-2.5 py-0.5 text-xs rounded-full font-medium transition-colors duration-300
                  ${
                    type === "question-papers"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {qpCount}
                </span>
              )}
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Group 2: View Mode Toggles with Enhanced Design */}
      <div className="flex bg-white border border-gray-100 p-1.5 rounded-lg shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setViewMode("grid")}
          className={`rounded-l-md px-3.5 transition-all duration-300 ${
            viewMode === "grid"
              ? "bg-gradient-to-b from-gray-50 to-white shadow-md"
              : "hover:bg-gray-50"
          }`}
        >
          <Grid3X3
            className={`h-4 w-4 ${
              viewMode === "grid" ? "text-primary" : "text-gray-500"
            } transition-colors duration-300`}
          />
          <span
            className={`ml-2 text-sm font-medium ${
              viewMode === "grid" ? "text-primary" : "text-gray-600"
            } transition-colors duration-300`}
          >
            Grid
          </span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setViewMode("list")}
          className={`rounded-r-md px-3.5 transition-all duration-300 ${
            viewMode === "list"
              ? "bg-gradient-to-b from-gray-50 to-white shadow-md"
              : "hover:bg-gray-50"
          }`}
        >
          <List
            className={`h-4 w-4 ${
              viewMode === "list" ? "text-primary" : "text-gray-500"
            } transition-colors duration-300`}
          />
          <span
            className={`ml-2 text-sm font-medium ${
              viewMode === "list" ? "text-primary" : "text-gray-600"
            } transition-colors duration-300`}
          >
            List
          </span>
        </Button>
      </div>
    </div>
  );
}
