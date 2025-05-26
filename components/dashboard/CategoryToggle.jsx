// components/dashboard/CategoryToggle.jsx

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FolderOpen, FileText, BookOpen } from "lucide-react";

export default function CategoryToggle({ type, setType }) {
  return (
    <ToggleGroup
      type="single"
      value={type}
      onValueChange={(value) => value && setType(value)}
      className="mt-6 flex gap-2 flex-wrap"
    >
      <ToggleGroupItem value="all" className="px-4 py-2">
        <FolderOpen className="w-4 h-4" />
        All PDFs
      </ToggleGroupItem>
      <ToggleGroupItem value="notes" className="px-4 py-2">
        <FileText className="w-4 h-4" />
        Notes
      </ToggleGroupItem>
      <ToggleGroupItem value="question-papers" className="px-4 py-2">
        <BookOpen className="w-4 h-4" />
        Question Papers
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
