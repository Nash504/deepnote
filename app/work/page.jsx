'use client';
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CategoryToggle from "@/components/dashboard/CategoryToggle";
import UploadPanel from "@/components/dashboard/UploadPanel";
import FileViewer from "@/components/dashboard/FileViewer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function Page() {
  const { user } = useUser();
  const [type, setType] = useState("all");
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
          <CategoryToggle type={type} setType={setType} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button onClick={() => setUpload(true)} className="flex items-center gap-8 text-md py-6">
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
        <FileViewer category={type} />
      </div>
    </div>
  );
}
