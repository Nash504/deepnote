// components/dashboard/UploadPanel.jsx

import { Button } from "@/components/ui/button";
import SupabaseUploader from "./SupabaseUploader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function UploadPanel({ type, setType, setUpload }) {
  return (
    <div className="mt-8 max-w-4xl mx-auto p-6 rounded-xl border-2 border-dashed border-black bg-white shadow-lg">
      <h2 className="font-medium text-xl mb-6 text-gray-800">Upload Documents</h2>
      <div className="space-y-6">
        <SupabaseUploader type={type} className="w-full" />
        <div className="text-xl font-medium text-gray-800">
          <label className="block font-medium text-gray-700 mb-3">Document Type</label>
          <RadioGroup
            value={type}
            onValueChange={setType}
            className="flex flex-row gap-6 flex-wrap"
          >
            <div className="flex items-center font-medium space-x-2">
              <RadioGroupItem value="question-papers" id="question-papers" />
              <label htmlFor="question-papers" className="cursor-pointer text-sm">
                Question Papers
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="notes" id="notes" />
              <label htmlFor="notes" className="cursor-pointer text-sm">
                Notes
              </label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={() => setUpload(false)}
            variant="outline"
            className="border-black border-2"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
