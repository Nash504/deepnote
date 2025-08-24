"use client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CategoryToggle from "@/components/dashboard/CategoryToggle";
import UploadPanel from "@/components/dashboard/UploadPanel";
import FileViewer from "@/components/dashboard/FileViewer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import ProgressBar from "@/components/dashboard/ProgressBar";
export default function Page() {
  const { user } = useUser();
  const [type, setType] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [upload, setUpload] = useState(false);
  const [fileDeleted, setFileDeleted] = useState(0);

  // Handler for when a file is deleted
  const handleFileDeleted = () => {
    setFileDeleted((prev) => prev + 1);
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-white via-gray-50/50 to-gray-50 min-h-screen overflow-auto px-6 sm:px-10 py-8">
      {/* Header Section with Enhanced Styling */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-gray-200 pb-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <DashboardHeader user={user} />
        </motion.div>
        <motion.div
          className="w-full sm:w-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            onClick={() => setUpload(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto px-5 py-2.5 flex items-center gap-2 justify-center font-medium shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Upload PDFs
          </Button>
        </motion.div>
      </div>

      {/* Upload Panel with Enhanced Animation */}
      {upload && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10"
        >
          <UploadPanel type={type} setType={setType} setUpload={setUpload} />
        </motion.div>
      )}

      {/* Main Content Area with Subtle Card Shadow */}
      <div className="mt-8 relative z-10">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6">
          <ProgressBar />
          <CategoryToggle
            type={type}
            setType={setType}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <FileViewer
            category={type}
            viewMode={viewMode}
            upload={upload}
            Deleted={fileDeleted}
            onFileDeleted={handleFileDeleted}
            setUpload={setUpload}
          />
        </div>
      </div>
    </div>
  );
}
