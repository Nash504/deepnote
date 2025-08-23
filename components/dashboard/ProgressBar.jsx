import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import PdfCard from "./PdfCard";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton"; // Assuming this is the correct import path for your project
import CategoryToggle from "./CategoryToggle";
// Skeleton component for the storage usage card using shadcn/ui Skeleton
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

// Skeleton component for an individual PDF card using shadcn/ui Skeleton
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

const FileViewer = ({ category }) => {
  const [questionPapers, setQuestionPapers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const MAX_STORAGE_MB = 100;
  const percentUsed = (totalSize / (MAX_STORAGE_MB * 1024 * 1024)) * 100;

  useEffect(() => {
    if (!user) return;

    const fetchFiles = async () => {
      setLoading(true); // Start loading
      try {
        const userPath = `users/${user.id}/uploads`;

        const [qpList, nList] = await Promise.all([
          supabase.storage
            .from("question-papers")
            .list(userPath, { limit: 100 }),
          supabase.storage.from("notes").list(userPath, { limit: 100 }),
        ]);

        const getSize = async (bucket, files) => {
          let total = 0;
          if (!files) return { result: [], total: 0 };
          const result = await Promise.all(
            files.map(async (file) => {
              // Note: Downloading the file just to get the size can be inefficient.
              // If Supabase Storage API provides size in the `list` method in the future,
              // that would be more optimal. For now, this approach is necessary.
              const { data } = await supabase.storage
                .from(bucket)
                .download(`${userPath}/${file.name}`);
              const size = data?.size || 0;
              total += size;
              return { ...file, size };
            })
          );
          return { result, total };
        };

        let sizeSum = 0;

        if (!qpList.error) {
          const { result, total } = await getSize(
            "question-papers",
            qpList.data
          );

          setQuestionPapers(result);
          sizeSum += total;
        } else {
          console.error("Error loading question papers:", qpList.error);
        }

        if (!nList.error) {
          const { result, total } = await getSize("notes", nList.data);
          setNotes(result);
          sizeSum += total;
        } else {
          console.error("Error loading notes:", nList.error);
        }

        setTotalSize(sizeSum);
      } catch (error) {
        console.error("An error occurred while fetching files:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFiles();
  }, [user]);

  // Render skeleton UI while loading
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

  const maxLength = Math.max(notes.length, questionPapers.length);
  const mixedItems = [];

  for (let i = 0; i < maxLength; i++) {
    if (notes[i]) mixedItems.push({ ...notes[i], type: "notes" });
    if (questionPapers[i])
      mixedItems.push({ ...questionPapers[i], type: "question-papers" });
  }

  let itemsToRender = [];
  if (category === "all") itemsToRender = mixedItems;
  else if (category === "notes")
    itemsToRender = notes.map((n) => ({ ...n, type: "notes" }));
  else if (category === "question-papers")
    itemsToRender = questionPapers.map((qp) => ({
      ...qp,
      type: "question-papers",
    }));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-sm text-muted-foreground">
          Total size: {(totalSize / 1024 / 1024).toFixed(2)} MB/100MB
        </p>
        <Card className="mb-8 border-border shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Storage Usage
                </h3>
                <p className="text-muted-foreground">
                  {(totalSize / 1024 / 1024).toFixed(2)} MB of 100 MB used
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-accent-foreground/50 text-accent-foreground"
              >
                {percentUsed.toFixed(1)}% Full
              </Badge>
            </div>
            <Progress value={percentUsed} className="h-3 bg-muted" />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default FileViewer;
