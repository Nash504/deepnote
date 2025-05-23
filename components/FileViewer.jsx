import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import PdfCard from './PdfCard'
import { motion } from 'framer-motion'

const FileViewer = ({ category }) => {
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
  const maxLength = Math.max(notes.length, questionPapers.length)
  const mixedItems = []

  for (let i = 0; i < maxLength; i++) {
    if (notes[i]) mixedItems.push({ ...notes[i], type: 'notes' })
    if (questionPapers[i]) mixedItems.push({ ...questionPapers[i], type: 'question-papers' })
  }

  // Decide which list to render
  let itemsToRender = []
  if (category === 'all') itemsToRender = mixedItems
  else if (category === 'notes') itemsToRender = notes.map(n => ({ ...n, type: 'notes' }))
  else if (category === 'question-papers') itemsToRender = questionPapers.map(qp => ({ ...qp, type: 'question-papers' }))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-60 lg:gap-84 px-2 sm:px-4 lg:px-40 py-4 sm:py-6 lg:py-8">
      {itemsToRender.map((pdf, index) => (
        <motion.div
          key={pdf.name + index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex justify-center w-full"
        >
          <PdfCard
            name={pdf.name}
            type={pdf.type}
            createdAt={pdf.created_at}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default FileViewer