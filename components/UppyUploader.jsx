"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

export default function UppyUploader({ bucketName }) {
  const uppy = useUppyWithSupabase({ bucketName });

  return (
    <div className="max-w-xl mx-auto p-4 border rounded">
      <Dashboard uppy={uppy} inline showProgressDetails />
    </div>
  );
}

export const useUppyWithSupabase = ({ bucketName }) => {
  const [uppy] = useState(() => new Uppy());

  const projectURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(projectURL, anonKey);

  useEffect(() => {
    const initializeUppy = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      uppy
        .use(Tus, {
          endpoint: `${projectURL}/storage/v1/upload/resumable`,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          headers: {
            authorization: `Bearer ${session?.access_token}`,
            apikey: anonKey,
          },
          uploadDataDuringCreation: true,
          removeFingerprintOnSuccess: true,
          chunkSize: 6 * 1024 * 1024,
          allowedMetaFields: [
            "bucketName",
            "objectName",
            "contentType",
            "cacheControl",
          ],
          onError: (error) => console.error("Upload error:", error),
        })
        .on("file-added", (file) => {
          file.meta = {
            ...file.meta,
            bucketName,
            objectName: file.name,
            contentType: file.type,
          };
        });
    };

    initializeUppy();

    return () => uppy.close();
  }, [uppy, bucketName]);

  return uppy;
};
