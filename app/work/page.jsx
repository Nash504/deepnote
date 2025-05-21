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
      {/* Sidebar (fixed width) */}
      <div className="flex">
        <div className="fixed hidden sm:block h-screen w-64 z-10">
          
          <AppSidebar  />
        </div>

        {/* Main content with left margin to accommodate sidebar */}
        <div className="sm:ml-64 flex-1 bg-gradient-to-b from-white to-gray-50 min-h-screen overflow-auto px-6 sm:px-10 py-8">
         <div className="flex flex-row justify-between ">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative border-b pb-6"
          >
            <h1 className="text-4xl font-light font-space-grotesk bg-black bg-clip-text text-transparent">
              {user?.firstName ? `Welcome, ${user.firstName}` : "Hello Scholar"}
            </h1>
            <p className="mt-2 text-gray-500">
              Manage your notes and question papers
            </p>

            {/* Toggle Group */}
            <ToggleGroup type="single" className="mt-6 flex gap-4">
              <ToggleGroupItem value="all">
                <p>All PDFs</p>
              </ToggleGroupItem>
              <ToggleGroupItem value="notes">
                <p>Notes</p>
              </ToggleGroupItem>
              <ToggleGroupItem value="question-papers">
                <p>Question Papers</p>
              </ToggleGroupItem>
            </ToggleGroup>

          </motion.div>
          <div>
            <Button onClick={() => setUpload(true)}><Plus /> Upload PDFs</Button>
          
          </div>
        </div>

       {upload ? (
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 0.5 }}
           className="mt-10 max-w-4xl p-6 rounded-xl border border-black border-dashed bg-white shadow justify-between"
         >
           <h2 className="font-medium text-xl mb-4 text-gray-800">
             Upload Documents
           </h2>

            <div className="flex flex-col gap-4">
              <SupabaseUploader type={type} className="w-full" />

              <RadioGroup
                defaultValue="question-papers"
                className="flex flex-row gap-6 flex-wrap"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="question-papers"
                    id="question-papers"
                    onClick={() => setType("question-papers")}
                  />
                  <label htmlFor="question-papers" className="cursor-pointer">
                    Question Papers
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="notes"
                    id="notes"
                  
                    onClick={() => setType("notes")}
                  />
                  <label htmlFor="notes" className="cursor-pointer">
                    Notes
                  </label>
                     
                </div>
              </RadioGroup>

               <Button onClick={() => setUpload(false)} variant="outline" className="border-black border-2">Cancel</Button>
            </div>
        
          </motion.div>) : null}

          {/* File Viewer */}
          <div className="mt-10">
            <FileViewer type={type} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
