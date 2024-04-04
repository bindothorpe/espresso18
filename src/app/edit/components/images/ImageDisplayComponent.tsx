"use client";

import Image from "next/image";
import EditImageModal from "./EditImageModal";
import { useState } from "react";

export default function ImageDisplayComponent(props: {
  key: number;
  imageId: string;
  url: string;
  title: string;
  altText: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      key={props.key}
      className="aspect-square relative group hover:cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      <Image
        fill
        src={props.url}
        alt={props.altText}
        objectFit="cover"
        className="rounded-lg"
      />
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition duration-300 rounded-lg"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="text-white text-xl font-bold">{props.title}</div>
        <div className="text-white text-l">Click to edit</div>
      </div>
      <EditImageModal
        imageId={props.imageId}
        imageTitle={props.title}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
