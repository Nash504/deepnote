// components/dashboard/CategoryToggle.jsx

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FolderOpen, FileText, BookOpen } from "lucide-react";

export default function CategoryToggle({ type, setType }) {
  return (
    <ToggleGroup
      type="single"
      value={type}
      onValueChange={(value) => value && setType(value)}
      className=" flex flex-wrap gap-4 sm:gap-6"
    >
      <ToggleGroupItem value="all" className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base">
        <FolderOpen className="w-4 h-4" />
        All PDFs
      </ToggleGroupItem>
      <ToggleGroupItem value="notes" className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base">
        <FileText className="w-4 h-4" />
        Notes
      </ToggleGroupItem>
      <ToggleGroupItem value="question-papers" className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base">
        <BookOpen className="w-4 h-4" />
        Question Papers
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
