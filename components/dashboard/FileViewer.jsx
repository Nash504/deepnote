import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import PdfCard from './PdfCard'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import { Progress } from '../ui/progress'
const FileViewer = ({ category }) => {
  const [questionPapers, setQuestionPapers] = useState([])
  const [notes, setNotes] = useState([])
  const [totalSize, setTotalSize] = useState(0)
  const { user } = useUser()
  const MAX_STORAGE_MB = 100
const percentUsed = (totalSize / (MAX_STORAGE_MB * 1024 * 1024)) * 100

  useEffect(() => {
    if (!user) return

    const fetchFiles = async () => {
      const userPath = `users/${user.id}/uploads`

      const [qpList, nList] = await Promise.all([
        supabase.storage.from('question-papers').list(userPath, { limit: 100 }),
        supabase.storage.from('notes').list(userPath, { limit: 100 }),
      ])

      const getSize = async (bucket, files) => {
        let total = 0
        const result = await Promise.all(
          files.map(async (file) => {
            const { data } = await supabase.storage.from(bucket).download(`${userPath}/${file.name}`)
            const size = data?.size || 0
            total += size
            return { ...file, size }
          })
        )
        return { result, total }
      }

      let sizeSum = 0

      if (!qpList.error) {
        const { result, total } = await getSize('question-papers', qpList.data)
        setQuestionPapers(result)
        sizeSum += total
      } else {
        console.error('Error loading question papers:', qpList.error)
      }

      if (!nList.error) {
        const { result, total } = await getSize('notes', nList.data)
        setNotes(result)
        sizeSum += total
      } else {
        console.error('Error loading notes:', nList.error)
      }

      setTotalSize(sizeSum)
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
    <>
    <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
      <p className="text-center text-sm text-gray-500">Total size: {(totalSize / 1024 / 1024).toFixed(2)} MB/100MB</p>
      <Progress value={percentUsed} className="w-full max-w-md mx-auto mt-2" />
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-8">
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
    </>
  )
}

export default FileViewer
