import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import PdfCard from "./PdfCard";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import ListCard from "./ListCard";

// Skeleton component for the storage usage card
const StorageCardSkeleton = () => (
  <div className="mb-8">
    <Skeleton className="h-5 w-1/2 mx-auto mb-2" />
    <Card className="border-border shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-3 w-full" />
      </CardContent>
    </Card>
  </div>
);

// Skeleton component for an individual PDF card
const PdfCardSkeleton = () => (
  <div className="w-full max-w-sm mx-auto">
    <Card className="h-48 flex flex-col justify-between p-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </Card>
  </div>
);

const FileViewer = ({ category, viewMode, upload, Deleted }) => {
  const [questionPapers, setQuestionPapers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const MAX_STORAGE_MB = 100;
  const percentUsed = (totalSize / (MAX_STORAGE_MB * 1024 * 1024)) * 100;

  useEffect(() => {
    if (!user) return;

    const fetchFiles = async () => {
      setLoading(true);
      try {
        const userPath = `users/${user.id}/uploads`;

        // Using Supabase SDK v2. `list` returns { data, error }
        const { data: qpData, error: qpError } = await supabase.storage
          .from("question-papers")
          .list(userPath, {
            limit: 100,
            sortBy: { column: "created_at", order: "desc" },
          });

        const { data: nData, error: nError } = await supabase.storage
          .from("notes")
          .list(userPath, {
            limit: 100,
            sortBy: { column: "created_at", order: "desc" },
          });

        if (qpError) throw qpError;
        if (nError) throw nError;

        // The file objects from `list` now include metadata like size
        const qpFiles = qpData.map((file) => ({
          ...file,
          size: file.metadata.size,
        }));
        const nFiles = nData.map((file) => ({
          ...file,
          size: file.metadata.size,
        }));

        const qpTotalSize = qpFiles.reduce((sum, file) => sum + file.size, 0);
        const nTotalSize = nFiles.reduce((sum, file) => sum + file.size, 0);

        setQuestionPapers(qpFiles);
        setNotes(nFiles);
        setTotalSize(qpTotalSize + nTotalSize);
      } catch (error) {
        console.error("An error occurred while fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [user, upload, Deleted]);

  if (loading) {
    return (
      <>
        <StorageCardSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <PdfCardSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  // Filtering logic
  const allFiles = [
    ...notes.map((n) => ({ ...n, type: "notes" })),
    ...questionPapers.map((qp) => ({ ...qp, type: "question-papers" })),
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const itemsToRender =
    category === "all"
      ? allFiles
      : category === "notes"
      ? notes.map((n) => ({ ...n, type: "notes" }))
      : questionPapers.map((qp) => ({ ...qp, type: "question-papers" }));

  return (
    <>
      {/* --- Storage Usage Card --- */}

      {/* --- Conditional Rendering for Grid or List View --- */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {itemsToRender.map((pdf, index) => (
            <motion.div
              key={pdf.id || pdf.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full"
            >
              <PdfCard
                name={pdf.name}
                type={pdf.type}
                createdAt={pdf.created_at}
                size={pdf.size}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-8">
          {itemsToRender.map((pdf, index) => (
            <motion.div
              key={pdf.id || pdf.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full"
            >
              <ListCard
                name={pdf.name}
                type={pdf.type}
                createdAt={pdf.created_at}
                size={pdf.size}
              />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default FileViewer;
