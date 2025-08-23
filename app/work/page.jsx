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

  return (
    <div className="flex-1 bg-gradient-to-b from-white to-gray-50 min-h-screen overflow-auto px-6 sm:px-10 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b pb-6">
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
            className="bg-gray-900 text-white hover:bg-gray-800 w-full sm:w-auto px-4 py-2 flex items-center gap-2 justify-center"
          >
            <Plus className="w-4 h-4" />
            Upload PDFs
          </Button>
        </motion.div>
      </div>
      {upload && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <UploadPanel type={type} setType={setType} setUpload={setUpload} />
        </motion.div>
      )}
      <div className="mt-10">
        <ProgressBar />
        <CategoryToggle
          type={type}
          setType={setType}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <FileViewer category={type} viewMode={viewMode} upload={upload} />
      </div>
    </div>
  );
}
