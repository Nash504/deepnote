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

  return (
    <div className="space-y-12 px-4 py-8"> 
      <div>
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">Question Papers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {questionPapers.map((pdf, index) => (
            <motion.div
              key={pdf.name + index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-center"
            >
              <PdfCard
                name={pdf.name}
                type={"question-papers"}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">Notes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {notes.map((pdf, index) => (
            <motion.div
              key={pdf.name + index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-center"
            >
              <PdfCard
                name={pdf.name}
                type={"notes"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FileViewer