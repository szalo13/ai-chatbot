"use client";

import { useRef, useState } from "react";

interface IUseFilePicker {
  onFilesAdd?: (files: File[]) => void;
}

export const useFilePicker = ({ onFilesAdd }: IUseFilePicker) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState<File[]>([]);

  const open = () => {
    // Trigger the click event of the file input
    if (!fileInputRef.current) return;
    (fileInputRef.current as any).click();
  };

  const handleFileChange = (event: any) => {
    const acceptedFiles: File[] = [];
    const notAcceptedFiles = [];

    if (!event?.target?.files?.length) return;
    Array.from(event.target.files).forEach((file: any) => {
      if (file.type === "application/pdf") {
        acceptedFiles.push(file);
      } else {
        notAcceptedFiles.push(file);
      }
    });

    onFilesAdd && onFilesAdd(acceptedFiles);
    setFiles(acceptedFiles);
    if (notAcceptedFiles.length) {
      alert("Not all files are a PDF file.");
    }
  };

  const inputComponent = (
    <input
      type="file"
      accept=".pdf"
      ref={fileInputRef}
      onChange={handleFileChange}
      style={{ display: "none" }}
    />
  );

  return {
    files,
    inputComponent,
    open,
    handleFileChange,
    // Return the input component to be used in the UI
  };
};
