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
    <Card className="border border-gray-100 shadow-sm overflow-hidden rounded-xl">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div className="space-y-2.5">
            <Skeleton className="h-7 w-36 mb-1" />
            <Skeleton className="h-5 w-52" />
          </div>
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
        <Skeleton className="h-2.5 w-full rounded-full" />
        <div className="flex justify-between mt-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  </div>
);

// Skeleton component for an individual PDF card
const PdfCardSkeleton = () => (
  <div className="w-full">
    <Card className="h-96 border border-gray-200 rounded-xl flex flex-col overflow-hidden">
      <div className="px-6 pt-4 pb-0 flex justify-between">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="flex justify-center items-center mx-6 rounded-xl py-10 mt-6">
        <div className="flex flex-col items-center">
          <Skeleton className="w-20 h-20 rounded-xl" />
          <Skeleton className="h-5 w-12 mt-3 rounded-md" />
        </div>
      </div>
      <div className="mt-4 px-6">
        <Skeleton className="h-7 w-3/4 mb-2" />
        <div className="flex justify-between mt-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      </div>
      <div className="flex justify-between mt-auto mb-4 px-6 border-t border-gray-100 pt-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </Card>
  </div>
);

// Skeleton component for list view
const ListCardSkeleton = () => (
  <Card className="w-full border border-gray-100 rounded-lg overflow-hidden">
    <div className="p-4 flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
      <div className="flex-grow space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  </Card>
);

const FileViewer = ({
  category,
  viewMode,
  upload,
  Deleted,
  onFileDeleted,
  setUpload,
}) => {
  const [questionPapers, setQuestionPapers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useUser();
  const MAX_STORAGE_MB = 100;
  const percentUsed = (totalSize / (MAX_STORAGE_MB * 1024 * 1024)) * 100;

  // Handler for when a file is deleted from a child component
  const handleFileDeleted = () => {
    setRefreshKey((prevKey) => prevKey + 1);
    // Also notify parent component if callback exists
    if (onFileDeleted) {
      onFileDeleted();
    }
  };

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
        const qpFiles = qpData
          ? qpData.map((file) => ({
              ...file,
              size: file.metadata?.size || 0,
            }))
          : [];

        const nFiles = nData
          ? nData.map((file) => ({
              ...file,
              size: file.metadata?.size || 0,
            }))
          : [];

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
  }, [user, upload, Deleted, refreshKey]);

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

  const formatBytes = (bytes) => {
    if (!bytes) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
  };

  return (
    <>
      {/* --- Storage Usage Card --- */}
      <div className="mb-8"></div>

      {/* --- Conditional Rendering for Grid or List View --- */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {loading ? (
            // Show skeletons while loading
            Array.from({ length: 8 }).map((_, index) => (
              <PdfCardSkeleton key={index} />
            ))
          ) : itemsToRender.length > 0 ? (
            itemsToRender.map((pdf, index) => (
              <motion.div
                key={`${pdf.id || pdf.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="w-full"
              >
                <PdfCard
                  name={pdf.name}
                  type={pdf.type}
                  createdAt={pdf.created_at}
                  size={pdf.size}
                  onFileDeleted={handleFileDeleted}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No files found
              </h3>
              <p className="text-base text-gray-600 max-w-md">
                {category === "all"
                  ? "Upload your first document to get started with your learning journey"
                  : `No ${category.replace(
                      "-",
                      " "
                    )} have been uploaded yet. Upload some to begin organizing your studies.`}
              </p>
              <button
                onClick={() => setUpload(true)}
                className="mt-6 px-6 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Upload Document
              </button>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-8">
          {loading ? (
            // Show skeletons while loading
            Array.from({ length: 5 }).map((_, index) => (
              <ListCardSkeleton key={index} />
            ))
          ) : itemsToRender.length > 0 ? (
            itemsToRender.map((pdf, index) => (
              <motion.div
                key={`${pdf.id || pdf.name}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="w-full"
              >
                <ListCard
                  name={pdf.name}
                  type={pdf.type}
                  createdAt={pdf.created_at}
                  size={pdf.size}
                  onFileDeleted={handleFileDeleted}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-white border border-gray-100 rounded-xl shadow-sm"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No files found
              </h3>
              <p className="text-base text-gray-600 max-w-md">
                {category === "all"
                  ? "Upload your first document to get started with your learning journey"
                  : `No ${category.replace(
                      "-",
                      " "
                    )} have been uploaded yet. Upload some to begin organizing your studies.`}
              </p>
              <button
                onClick={() => setUpload(true)}
                className="mt-6 px-6 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Upload Document
              </button>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
};

export default FileViewer;
