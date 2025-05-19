"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import PdfCard from "@/components/PdfCard";
import { RadioGroup,RadioGroupItem } from "@/components/ui/radio-group";
import SupabaseUploader from "@/components/SupabaseUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function Page() {
  const { isSignedIn, user } = useUser();
  const [pdfs, setPdfs] = useState([]);

  const [type, setType] = useState('question-papers');


 

 
  return (
    <div className="bg-white flex flex-col">
      <h1 className="text-4xl font-light p-8 font-space-grotesk ">
        {user?.firstName ? `Welcome ${user.firstName}` : "Hello"}
      </h1>

     

      {/* Here is where you add Uppy uploader safely outside any buttons */}
     
  <div className="max-h-max max-w-full p-12 flex justify-center relative overflow-hidden mx-auto rounded-4xl">
   <div>
     <RadioGroup>
      <div className="flex flex-row gap-4">
        <RadioGroupItem
          value="question-papers"
          id="question-papers"
          onClick={() => setType("question-papers")}
        />
        <label htmlFor="question-papers">Question Papers</label>
      </div>
      <div className="flex flex-row gap-4">
        <RadioGroupItem
          value="notes"
          id="notes"
          onClick={() => setType("notes")}
        />
        <label htmlFor="notes">Notes</label>
      </div>
     </RadioGroup>

  <SupabaseUploader type={type} />
</div>




      <div className="grid grid-cols-1 sm:grid-cols-3 p-4 justify-center gap-4">
        {pdfs.map((pdf, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <PdfCard
              key={index}
              name={pdf.name}
              type={pdf.type}
              onDelete={() => handleDelete(pdf.name)}
            />
          </motion.div>
        ))}
      </div>

      
    </div>
  </div>
  );
}
