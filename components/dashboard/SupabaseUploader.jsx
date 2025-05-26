'use client'

import { useEffect, useState } from 'react'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { supabase } from '../../lib/supabase'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Upload } from 'lucide-react'
import { useUser } from "@clerk/nextjs";

export default function SupabaseUploader({ type }) {
  const [uppy, setUppy] = useState(null)
  const [uploadStatus, setUploadStatus] = useState(null) // 'success', 'error', or null
  const [uploadMessage, setUploadMessage] = useState('')
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const instance = new Uppy({
      restrictions: { maxNumberOfFiles: 5 },
      allowMultipleUploadBatches: true,
    })

    instance.on('upload', () => {
      setUploadStatus(null)
      setUploadMessage('Uploading files...')
    })

    instance.on('complete', async (result) => {
      let success = true
      let successCount = 0
      
    for (const file of result.successful) {
        const { data, error } = await supabase.storage
          .from(type)
          .upload(`users/${userId}/uploads/${file.name}`, file.data, {
            cacheControl: '3600',
            upsert: true,
          })

        if (error) {
          console.error(`Failed to upload ${file.name}:`, error.message)
          success = false
        } else {
          console.log(`Uploaded ${file.name}:`, data)
          successCount++
        }
      }

      if (result.successful.length === 0) {
        return
      }
      
      if (success) {
        setUploadStatus('success')
        setUploadMessage(`Successfully uploaded ${successCount} file${successCount !== 1 ? 's' : ''}`)
        // Reset status after 5 seconds
        setTimeout(() => {
          setUploadStatus(null)
          setUploadMessage('')
        }, 5000)
      } else {
        setUploadStatus('error')
        setUploadMessage('Some files failed to upload. Please try again.')
      }
    })

    instance.on('error', (error) => {
      console.error(error)
      setUploadStatus('error')
      setUploadMessage('Upload failed. Please try again.')
    })

    setUppy(instance)
     // return () => instance.close()
   
  }, [type])

  if (!uppy) return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-pulse flex space-x-2">
        <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
        <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
        <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {!type ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Please select a document type before uploading</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border bg-background border-black">
            <Dashboard 
              uppy={uppy} 
              proudlyDisplayPoweredByUppy={false}
              theme="light" 
              width="100%" 
              height={300 }
              color="#c2f245"
              showLinkToFileUploadResult={false}
              showProgressDetails={true}
              note={`Upload your ${type.replace('-', ' ')} here. Maximum 5 files.`}
            />
          </div>
          
          {uploadStatus && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center p-3 rounded-md ${
                uploadStatus === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {uploadStatus === 'success' ? (
                <CheckCircle2 className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              <p className="text-sm">{uploadMessage}</p>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}