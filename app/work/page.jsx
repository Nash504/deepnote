"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import FileViewer from "@/components/FileViewer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SupabaseUploader from "@/components/SupabaseUploader";

export default function Page() {
  const { isSignedIn, user } = useUser();
  const [pdfs, setPdfs] = useState([]);
  const [type, setType] = useState("question-papers");


  // Animation variants for container elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header section with welcome message */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden py-8 px-4 sm:px-8 border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-light font-space-grotesk bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {user?.firstName ? `Welcome, ${user.firstName}` : "Hello Scholar"}
          </h1>
          <p className="mt-2 text-gray-500">
            Your knowledge repository for academic excellence
          </p>
        </div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-50 rounded-full opacity-20" />
      </motion.div>

      {/* Upload section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-4xl mx-auto p-6 sm:p-8 mt-4 sm:mt-8 bg-white shadow-2xl rounded-xl"
      >
        <h2 className="font-medium text-xl mb-4 text-gray-800">Upload Documents</h2>
        
        <div className="flex flex-col gap-4">
          <RadioGroup defaultValue="question-papers" className="flex flex-row gap-6 flex-wrap">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="question-papers"
                id="question-papers"
                onClick={() => setType("question-papers")}
              />
              <label htmlFor="question-papers" className="cursor-pointer">Question Papers</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="notes"
                id="notes"
                onClick={() => setType("notes")}
              />
              <label htmlFor="notes" className="cursor-pointer">Notes</label>
            </div>
          </RadioGroup>

          <SupabaseUploader type={type} className="w-full" />
        </div>
      </motion.div>

    
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
         
        </motion.div>

        {pdfs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-16"
          >
            <p className="text-gray-500">No documents yet. Upload your first one!</p>
          </motion.div>
        )}
        <FileViewer />
      </div>
   
  );
}