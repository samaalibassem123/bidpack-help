import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  id: string;
}

export default function Logo({ className, id }: Props) {
  return (
    <Image
      alt="logo"
      width={900}
      height={1080}
      src={"/assets/logo.jpeg"}
      className={cn(" w-full h-full", className)}
    />
  );
}
