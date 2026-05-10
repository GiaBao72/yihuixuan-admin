"use client";

import { useState } from "react";
import { Upload, X, ExternalLink, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface GalleryUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label: string;
  helpText?: string;
}

export function GalleryUpload({ value, onChange, label, helpText }: GalleryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const urls = data.map((item: any) => `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.url}`);
      onChange([...value, ...urls]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange([...value, urlInput.trim()]);
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {value.map((url, index) => (
            <div key={index} className="relative border rounded-lg p-2 bg-muted/50">
              <div className="relative w-full h-32 mb-2">
                <Image
                  src={url}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover rounded"
                  unoptimized
                />
              </div>
              <div className="flex items-center gap-1">
                <GripVertical className="h-3 w-3 text-muted-foreground" />
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1 flex-1 truncate"
                >
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">Image {index + 1}</span>
                </a>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeImage(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            {uploading ? "Uploading..." : "Upload multiple images"}
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="gallery-upload"
          />
          <label htmlFor="gallery-upload">
            <Button type="button" variant="outline" size="sm" disabled={uploading}>
              <span>Choose Files</span>
            </Button>
          </label>
        </div>

        <div className="text-center text-xs text-muted-foreground">or</div>

        {showUrlInput ? (
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-3 py-2 text-sm border rounded-md"
            />
            <Button type="button" size="sm" onClick={handleUrlSubmit}>
              Add
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setShowUrlInput(false);
                setUrlInput("");
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowUrlInput(true)}
            className="w-full"
          >
            Add URL
          </Button>
        )}
      </div>
    </div>
  );
}
