"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";
import Image from "next/image";
import { convertToBase64 } from "@/lib/utils";

type ImageDropzoneProps = {
  id?: string;
  name: string;
  required?: boolean;
  value?: File | string;
  onChange?: (file?: File) => void;
};

const ImageDropzone = ({
  id,
  name,
  value,
  required,
  onChange,
}: ImageDropzoneProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        convertToBase64(file).then((image) => {
          setPreview(image);
        });
      }
      onChange?.(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".svg"],
    },
    multiple: false,
  });

  const removeImage = () => {
    setPreview(null);
  };

  useEffect(() => {
    console.log(`[ImageDropzone] value:`, value);
    if (typeof value === "string") {
      setPreview(value);
      onChange?.(undefined);
    } else if (value) {
      convertToBase64(value).then((image) => {
        setPreview(image);
      });
    }
  }, [value, onChange]);

  if (preview) {
    return (
      <div className="relative w-full h-64">
        {/* eslint-disable-next-line @next/next/no-img-element  */}
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover rounded-lg"
        />
        <button
          onClick={removeImage}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
          aria-label="Remove image"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
    >
      <input {...getInputProps()} id={id} name={name} required={required} />
      <div className="flex flex-col items-center text-center p-4">
        <Image
          src="/assets/svgs/image-plus.svg"
          alt="Upload"
          width={48}
          height={48}
          className="mb-4"
        />
        {isDragActive ? (
          <p className="text-blue-500">Drop the image here</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop an image here, or click to select
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageDropzone;
