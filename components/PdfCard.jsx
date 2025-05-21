"use client";
import { motion, AnimatePresence } from "framer-motion";

import { Card } from "@/components/ui/card";
import { StickyNote } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function PdfCard({ name, type }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const typeLabel = type === "notes" ? "Notes" : "Question Paper";
  const badgeColor = type === "notes" ? "bg-lime-500" : "bg-black";

  return (
    <div className="flex flex-col items-center ">
      {/* Main View Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AnimatePresence>
          {isDialogOpen && (
            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <DialogContent className="sm:max-w-[425px] space-y-4">
                <Card className="bg-lime-300 p-8 border-2 border-black">
                  <div className="flex flex-col justify-center items-center ">
                    <StickyNote className="w-16 h-16 mb-2" />
                    <h1 className="text-md font-semibold">
                      {name ?? "No file selected"}
                    </h1>
                  </div>
                </Card>
                <div className="flex flex-col sm:flex-row gap-2 justify-end">
                  <Button
                    className="border-2 border-black"
                    variant="destructive"
                    onClick={() => setIsDeleteOpen(true)}
                  >
                    Delete
                  </Button>
                  {type === "notes" ? (
                    <>
                      <Button>View FlashCards</Button>
                      <Link href="/work/chat">
                        <Button>Chat with PDF</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Button>View Questions</Button>
                      <Button>View Answers</Button>
                    </>
                  )}
                </div>
              </DialogContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px] space-y-4">
          <h1 className="text-lg font-semibold">Delete "{name}"?</h1>
          <div className="flex gap-2 justify-end">
            <Button
              className="border-2 border-black"
              variant="destructive"
              onClick={() => {
                onDelete();
                setIsDeleteOpen(false);
                setIsDialogOpen(false);
              }}
            >
              Confirm
            </Button>
            <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Card Preview */}
      <Card
        onClick={() => setIsDialogOpen(true)}
        className="p-4 border-2 border-black duration-100 ease-in-out shadow-lg backdrop-blur-sm rounded-lg cursor-pointer w-90 h-64 flex flex-col"
      >
        <div className="flex-1 flex flex-col justify-between">
          <div className="mb-20"></div>
          <hr className="border-black w-full my-2" />
          <div className="flex flex-col gap-2 items-end">
            <h1 className="font-semibold text-lg">{name}</h1>
            <span
              className={`text-white font-bold w-fit border-2 border-black px-4 py-1 rounded-2xl ${badgeColor}`}
            >
              {typeLabel}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
