'use client';

import { useCallback, useState } from 'react';

interface FileUploadProps {
  onFileLoad: (content: string) => void;
  onError: (error: string) => void;
}

export function FileUpload({ onFileLoad, onError }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith('.xml') && !file.name.endsWith('.musicxml')) {
        onError('MusicXML 파일(.xml, .musicxml)만 지원됩니다');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileName(file.name);
        onFileLoad(content);
      };
      reader.onerror = () => {
        onError('파일을 읽을 수 없습니다');
      };
      reader.readAsText(file);
    },
    [onFileLoad, onError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
        ${isDragging
          ? 'border-bass-400 bg-bass-50'
          : 'border-gray-300 hover:border-bass-300 hover:bg-gray-50'
        }
      `}
    >
      <input
        type="file"
        accept=".xml,.musicxml"
        onChange={handleInputChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="text-4xl mb-4">🎸</div>
        {fileName ? (
          <p className="text-bass-600 font-medium">{fileName}</p>
        ) : (
          <>
            <p className="text-gray-600 font-medium">
              MusicXML 파일을 드래그하거나 클릭하여 선택
            </p>
            <p className="text-gray-400 text-sm mt-2">.xml, .musicxml 지원</p>
          </>
        )}
      </label>
    </div>
  );
}
