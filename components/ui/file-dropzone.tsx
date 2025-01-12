import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { X, FileText, Upload } from "lucide-react";

type FileDropzoneProps = {
  id?: string;
  name: string;
  required?: boolean;
  value?: File;
  onChange?: (file?: File) => void;
  accept?: Record<string, string[]>;
};

const FileDropzone = ({
  id,
  name,
  value,
  required,
  onChange,
  accept = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "image/*": [".jpg", ".jpeg", ".png", ".gif"],
  },
}: FileDropzoneProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uploadedFile = acceptedFiles[0];
      if (uploadedFile) {
        setFile(uploadedFile);
        // For images, create preview
        if (uploadedFile.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(uploadedFile);
        } else {
          setPreview(null);
        }
        onChange?.(uploadedFile);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onChange?.(undefined);
  };

  useEffect(() => {
    if (value && value instanceof File) {
      setFile(value);
      if (value.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(value);
      }
    }
  }, [value]);

  if (file) {
    return (
      <div className="relative w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
              <FileText size={24} className="text-gray-400" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {file.name}
            </p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={removeFile}
            className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 border border-gray-200"
            aria-label="Remove file"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`w-full border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-gray-300 hover:border-gray-400"
      }`}
    >
      <input {...getInputProps()} id={id} name={name} required={required} />
      <div className="flex flex-col items-center text-center p-8">
        <Upload size={32} className="mb-3 text-gray-400" />
        {isDragActive ? (
          <p className="text-primary">Drop the file here</p>
        ) : (
          <>
            <p className="text-gray-600">
              Drag and drop a file here, or click to select
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: PDF, DOC, DOCX, Images
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
