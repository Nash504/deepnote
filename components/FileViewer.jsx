// FileViewer.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const FileViewer = () => {
  const [files, setFiles] = useState([])

  useEffect(() => {
    const fetchFiles = async () => {
    const { data, error } = await supabase
  .storage
  .from('question-papers')
  .list('uploads', {
    limit: 100,
    offset: 0,
  })


      if (error) console.error('Error fetching files:', error)
      else setFiles(data)
    }

    fetchFiles()
  }, [])

  return (
    <div>
      <h2>Files in Bucket</h2>
      <ul>
        {files.map(file => (
          <li key={file.name}>
            {file.name} - {file.metadata?.size || 'Unknown size'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FileViewer
