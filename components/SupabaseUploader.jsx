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
      autoProceed: true,
      restrictions: {
        maxNumberOfFiles: 1
      }
    })

    instance.on('file-added', async (file) => {
      const { data, error } = await supabase.storage
        .from('notes') // change this
        .upload(`uploads/${file.name}`, file.data, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) {
        console.error('Upload error:', error.message)
      } else {
        console.log('Uploaded file:', data)
      }
    })

    setUppy(instance)

    return () => instance.close()
  }, [])

  if (!uppy) return <p>Loading uploader...</p>

return (
  <div style={{ zIndex: 9999, position: 'relative' }}>
    <Dashboard uppy={uppy} />
  </div>
)

}
