import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import { HardDrive, Database, Cloud } from "lucide-react";
// Skeleton component for the storage usage card
const StorageCardSkeleton = () => (
  <div className="mb-6">
    <Card className="border-border shadow-sm bg-white/60">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <Skeleton className="h-3 w-full mt-4" />
        <div className="flex justify-between mt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  </div>
);

const ProgressBar = () => {
  const [totalSize, setTotalSize] = useState(0);
  const [qpSize, setQpSize] = useState(0);
  const [notesSize, setNotesSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const MAX_STORAGE_MB = 100;
  const percentUsed = (totalSize / (MAX_STORAGE_MB * 1024 * 1024)) * 100;

  useEffect(() => {
    if (!user) return;

    const fetchStorageInfo = async () => {
      setLoading(true);
      try {
        const userPath = `users/${user.id}/uploads`;

        const [qpList, nList] = await Promise.all([
          supabase.storage
            .from("question-papers")
            .list(userPath, { limit: 100 }),
          supabase.storage.from("notes").list(userPath, { limit: 100 }),
        ]);

        // Get sizes from metadata if available
        let qpSizeTotal = 0;
        if (qpList.data) {
          qpSizeTotal = qpList.data.reduce(
            (sum, file) => sum + (file.metadata?.size || 0),
            0
          );
        }

        let notesSizeTotal = 0;
        if (nList.data) {
          notesSizeTotal = nList.data.reduce(
            (sum, file) => sum + (file.metadata?.size || 0),
            0
          );
        }

        setQpSize(qpSizeTotal);
        setNotesSize(notesSizeTotal);
        setTotalSize(qpSizeTotal + notesSizeTotal);
      } catch (error) {
        console.error("Error fetching storage info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStorageInfo();
  }, [user]);

  // Format bytes to human-readable format
  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getColorClass = (percent) => {
    if (percent < 50) return "bg-green-500";
    if (percent < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return <StorageCardSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <Card className="border border-gray-200 shadow-sm bg-white backdrop-blur-sm hover:shadow transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <HardDrive className="mr-2 h-5 w-5 text-primary" />
                Storage Usage
              </h3>
              <p className="text-muted-foreground mt-1">
                {formatBytes(totalSize)} of {MAX_STORAGE_MB} MB used
              </p>
            </div>

            <div className="bg-primary/10 text-primary font-semibold p-2 px-4 rounded-full flex items-center gap-2">
              <Database className="h-4 w-4" />
              {percentUsed.toFixed(1)}%
            </div>
          </div>

          <div className="h-2.5 w-full bg-gray-200 rounded-full mb-1 overflow-hidden">
            <div
              className={`h-full rounded-full ${getColorClass(
                percentUsed
              )} transition-all duration-500`}
              style={{ width: `${Math.min(percentUsed, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary/70 mr-1"></div>
              Question Papers: {formatBytes(qpSize)}
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary/40 mr-1"></div>
              Notes: {formatBytes(notesSize)}
            </div>
            <div className="flex items-center">
              <Cloud className="h-3 w-3 mr-1 text-gray-400" />
              Available: {formatBytes(MAX_STORAGE_MB * 1024 * 1024 - totalSize)}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProgressBar;
