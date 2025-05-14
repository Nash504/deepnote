// components/PdfCard.jsx
import { Card } from "@/components/ui/card";
import { StickyNote } from "lucide-react";

export default function PdfCard({ name, type }) {
  const color = type === "notes" ? "bg-green-500" : "bg-orange-500";
  const label = type === "notes" ? "Notes" : "Question Paper";

  return (
     <Card className="p-8 m-4 border-2 border-black">
      <StickyNote className="w-8 h-8" />

      <div className="flex flex-col items-end gap-2">
        <h1 className="font-semibold text-sm">{name}</h1>
        <span className={`text-white font-bold w-fit border-2 border-black px-2 py-1 rounded-2xl  ${color}`}>{label}</span>
      </div>
    </Card>
  
  );
}
