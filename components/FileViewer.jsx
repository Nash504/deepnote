import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import PdfCard from './PdfCard'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'

const FileViewer = ({ category }) => {
  const [questionPapers, setQuestionPapers] = useState([])
  const [notes, setNotes] = useState([])
  const { user } = useUser()

  useEffect(() => {
    if (!user) return

    const fetchFiles = async () => {
      const userPath = `users/${user.id}/uploads`

      const [qpList, nList] = await Promise.all([
        supabase.storage.from('question-papers').list(userPath, { limit: 100 }),
        supabase.storage.from('notes').list(userPath, { limit: 100 }),
      ])

      const getSize = async (bucket, files) => {
        return Promise.all(files.map(async (file) => {
          const { data } = await supabase.storage.from(bucket).download(`${userPath}/${file.name}`)
          return { ...file, size: data?.size || 0 }
        }))
      }

      if (qpList.error) console.error('Error loading question papers:', qpList.error)
      else {
        const withSize = await getSize('question-papers', qpList.data)
        setQuestionPapers(withSize)
      }

      if (nList.error) console.error('Error loading notes:', nList.error)
      else {
        const withSize = await getSize('notes', nList.data)
        setNotes(withSize)
      }
    }

    fetchFiles()
  }, [user])

  const maxLength = Math.max(notes.length, questionPapers.length)
  const mixedItems = []

  for (let i = 0; i < maxLength; i++) {
    if (notes[i]) mixedItems.push({ ...notes[i], type: 'notes' })
    if (questionPapers[i]) mixedItems.push({ ...questionPapers[i], type: 'question-papers' })
  }

  let itemsToRender = []
  if (category === 'all') itemsToRender = mixedItems
  else if (category === 'notes') itemsToRender = notes.map(n => ({ ...n, type: 'notes' }))
  else if (category === 'question-papers') itemsToRender = questionPapers.map(qp => ({ ...qp, type: 'question-papers' }))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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
            size={pdf.size}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default FileViewer
