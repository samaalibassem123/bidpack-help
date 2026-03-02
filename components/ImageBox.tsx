"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

interface Props {
  img_url: string;
  className?: string;
}

export default function ImageBox({ img_url, className }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Normal image */}
      {loading && <Skeleton className=" sm:w-lg h-[400px] w-auto" />}

      <Image
        alt="img"
        src={img_url}
        width={900}
        height={1000}
        className={cn(
          "sm:w-lg w-auto rounded-lg cursor-pointer transition-opacity duration-300",
          loading ? "opacity-0 " : "opacity-100",
          className
        )}
        onClick={() => setOpen(true)}
        onLoadingComplete={() => setLoading(false)}
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
            <Image
              alt="img"
              width={900}
              height={1000}
              src={img_url}
              className="max-w-[95%] max-h-[95%] rounded-xl shadow-2xl"
            />
          </motion.div>,
          document.body
        )}
    </>
  );
}
