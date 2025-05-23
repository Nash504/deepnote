"use client";
import AppSidebar from "@/components/app-sidebar";
import { motion } from "framer-motion";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import FileViewer from "@/components/FileViewer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SupabaseUploader from "@/components/SupabaseUploader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Page() {
  const { user } = useUser();
  const [type, setType] = useState("question-papers");
  const [upload, setUpload] = useState(false);
 
  return (
    <SidebarProvider>
      <div className="flex">
        {/* Sidebar (fixed width) */}
        <div className="fixed hidden sm:block h-screen w-64 z-10">
          <AppSidebar />
        </div>

        {/* Main content with left margin to accommodate sidebar */}
        <div className="sm:ml-64 flex-1 bg-gradient-to-b from-white to-gray-50 min-h-screen overflow-auto px-6 sm:px-10 py-8">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <h1 className="text-4xl font-light font-space-grotesk bg-black bg-clip-text text-transparent">
                {user?.firstName ? `Welcome, ${user.firstName}` : "Hello Scholar"}
              </h1>
              <p className="mt-2 text-gray-500">
                Manage your notes and question papers
              </p>

              {/* Toggle Group */}
              <ToggleGroup 
                type="single" 
                value={type} 
                onValueChange={(value) => value && setType(value)}
                className="mt-6 flex gap-2 flex-wrap"
              >
                <ToggleGroupItem value="all" className="px-4 py-2">
                  All PDFs
                </ToggleGroupItem>
                <ToggleGroupItem value="notes" className="px-4 py-2">
                  Notes
                </ToggleGroupItem>
                <ToggleGroupItem value="question-papers" className="px-4 py-2">
                  Question Papers
                </ToggleGroupItem>
              </ToggleGroup>
            </motion.div>

            {/* Upload Button */}
            <div className="flex-shrink-0">
              <Button 
                onClick={() => setUpload(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Upload PDFs
              </Button>
            </div>
          </div>

          {/* Upload Section */}
          {upload && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 max-w-4xl mx-auto p-6 rounded-xl border-2 border-dashed border-black bg-white shadow-lg"
            >
              <h2 className="font-medium text-xl mb-6 text-gray-800">
                Upload Documents
              </h2>

              <div className="space-y-6">
                {/* File Uploader */}
                <SupabaseUploader type={type} className="w-full" />

                {/* Document Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Document Type
                  </label>
                  <RadioGroup
                    value={type}
                    onValueChange={setType}
                    className="flex flex-row gap-6 flex-wrap"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="question-papers"
                        id="question-papers"
                      />
                      <label htmlFor="question-papers" className="cursor-pointer text-sm">
                        Question Papers
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="notes"
                        id="notes"
                      />
                      <label htmlFor="notes" className="cursor-pointer text-sm">
                        Notes
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Cancel Button */}
                <div className="flex justify-end pt-4 border-t">
                  <Button 
                    onClick={() => setUpload(false)} 
                    variant="outline" 
                    className="border-black border-2"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* File Viewer Section */}
          <div className="mt-10 ">
            <FileViewer category={type} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}