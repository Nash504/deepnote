import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import PdfCard from './PdfCard'
import { motion } from 'framer-motion'

const FileViewer = () => {
  const [questionPapers, setQuestionPapers] = useState([])
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const fetchFiles = async () => {
      const [{ data: qpData, error: qpError }, { data: nData, error: nError }] = await Promise.all([
        supabase.storage.from('question-papers').list('uploads', { limit: 100 }),
        supabase.storage.from('notes').list('uploads', { limit: 100 }),
      ])

      if (qpError) console.error('Error loading question papers:', qpError)
      else setQuestionPapers(qpData)

      if (nError) console.error('Error loading notes:', nError)
      else setNotes(nData)
    }

    fetchFiles()
  }, [])

// Combine and alternate notes and question papers
const maxLength = Math.max(notes.length, questionPapers.length);
const mixedItems = [];

for (let i = 0; i < maxLength; i++) {
  if (notes[i]) {
    mixedItems.push({ ...notes[i], type: "notes" });
  }
  if (questionPapers[i]) {
    mixedItems.push({ ...questionPapers[i], type: "question-papers" });
  }
}

return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-20 px-4 py-8 ">
    {mixedItems.map((pdf, index) => (
      <motion.div
        key={pdf.name + index}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex justify-center "
      >
        <PdfCard 
          name={pdf.name}
          type={pdf.type}
          createdAt={pdf.created_at}
        />
      </motion.div>
    ))}
  </div>
);

}

export default FileViewer