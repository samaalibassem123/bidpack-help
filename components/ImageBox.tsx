"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface Props {
  img_url: string;
  className?: string;
}

export default function ImageBox({ img_url, className }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Normal image */}
      <img
        src={img_url}
        className={cn("sm:w-lg w-auto rounded-lg cursor-pointer", className)}
        onClick={() => setOpen(true)}
      />

      {/* Fullscreen Modal via Portal */}
      {mounted &&
        open &&
        createPortal(
          <motion.div
            className="fixed motion-preset-expand inset-0 animate-in bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img
              src={img_url}
              className="max-w-[95%] max-h-[95%] rounded-xl shadow-2xl"
            />
          </motion.div>,
          document.body
        )}
    </>
  );
}
