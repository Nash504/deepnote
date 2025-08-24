// components/dashboard/UploadPanel.jsx

import { Button } from "@/components/ui/button";
import SupabaseUploader from "./SupabaseUploader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookOpen, FileText, X, Upload } from "lucide-react";

export default function UploadPanel({ type, setType, setUpload }) {
  return (
    <div className="mt-8 max-w-4xl mx-auto p-8 rounded-2xl border border-gray-200 bg-white shadow-lg relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20px 20px, #d1d5db 2px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center">
          <div className="bg-primary/10 p-2 rounded-lg mr-3">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-semibold text-2xl text-gray-800">
            Upload Documents
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setUpload(false)}
          className="rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-500" />
        </Button>
      </div>

      <div className="space-y-8 relative z-10">
        <SupabaseUploader type={type} className="w-full" />

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label className="block font-medium text-gray-800 mb-4 text-lg">
            Select Document Type
          </label>
          <RadioGroup
            value={type}
            onValueChange={setType}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div
              className={`flex items-center p-4 rounded-lg border transition-all cursor-pointer
                ${
                  type === "question-papers"
                    ? "border-purple-200 bg-purple-50/50 shadow-sm"
                    : "border-gray-200 hover:border-purple-200 hover:bg-purple-50/30"
                }`}
            >
              <RadioGroupItem
                value="question-papers"
                id="question-papers"
                className="sr-only"
              />
              <label
                htmlFor="question-papers"
                className="cursor-pointer flex items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3
                  ${
                    type === "question-papers" ? "bg-purple-100" : "bg-gray-100"
                  }`}
                >
                  <BookOpen
                    className={`w-5 h-5 ${
                      type === "question-papers"
                        ? "text-purple-600"
                        : "text-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      type === "question-papers"
                        ? "text-purple-900"
                        : "text-gray-800"
                    }`}
                  >
                    Question Papers
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload exam papers, quizzes, or tests
                  </p>
                </div>
              </label>
            </div>

            <div
              className={`flex items-center p-4 rounded-lg border transition-all cursor-pointer
                ${
                  type === "notes"
                    ? "border-blue-200 bg-blue-50/50 shadow-sm"
                    : "border-gray-200 hover:border-blue-200 hover:bg-blue-50/30"
                }`}
            >
              <RadioGroupItem value="notes" id="notes" className="sr-only" />
              <label
                htmlFor="notes"
                className="cursor-pointer flex items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3
                  ${type === "notes" ? "bg-blue-100" : "bg-gray-100"}`}
                >
                  <FileText
                    className={`w-5 h-5 ${
                      type === "notes" ? "text-blue-600" : "text-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      type === "notes" ? "text-blue-900" : "text-gray-800"
                    }`}
                  >
                    Notes
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload lecture notes, summaries, or study materials
                  </p>
                </div>
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end pt-5 border-t">
          <Button
            onClick={() => setUpload(false)}
            variant="outline"
            className="mr-3 border-gray-200 hover:bg-gray-50 transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={() => setUpload(false)}
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-md"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
