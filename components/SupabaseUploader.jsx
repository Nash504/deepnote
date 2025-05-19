'use client'

import { useEffect, useState } from 'react'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { supabase } from '../lib/supabase'

export default function SupabaseUploader() {
  const [uppy, setUppy] = useState(null)

  useEffect(() => {
    const instance = new Uppy({
      restrictions: { maxNumberOfFiles: 5 }, // multiple files
    })

    instance.on('complete', async (result) => {
      for (const file of result.successful) {
        const { data, error } = await supabase.storage
          .from('notes')
          .upload(`uploads/${file.name}`, file.data, {
            cacheControl: '3600',
            upsert: true,
          })

        if (error) {
          console.error(`Failed to upload ${file.name}:`, error.message)
        } else {
          console.log(`Uploaded ${file.name}:`, data)
        }
      }
    })

    setUppy(instance)
    return () => instance.close()
  }, [])

  if (!uppy) return <p>Loading uploader...</p>

  return (
    <div className="rounded-md border bg-background">
      <Dashboard uppy={uppy} theme="dark" width={600} height={400} />
    </div>
  )
}
