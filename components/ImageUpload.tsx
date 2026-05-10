"use client";

import { useState } from "react";
import { Upload, X, ExternalLink, Eye, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  label: string;
  helpText?: string;
}

export function ImageUpload({ value, onChange, label, helpText }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data[0]?.url) {
        onChange(`${process.env.NEXT_PUBLIC_STRAPI_URL}${data[0].url}`);
        setImageError(false);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setShowUrlInput(false);
      setImageError(false);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
      </div>

      {value ? (
        <div className="border rounded-lg overflow-hidden bg-muted/30">
          {/* Image Preview */}
          <div className="relative w-full h-48 bg-muted/50 flex items-center justify-center">
            {imageError ? (
              <div className="text-center p-4">
                <ImageOff className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Failed to load image</p>
              </div>
            ) : (
              <Image
                src={value}
                alt={label}
                fill
                className="object-contain"
                unoptimized
                onError={() => setImageError(true)}
              />
            )}
          </div>

          {/* Actions */}
          <div className="p-3 border-t bg-card flex items-center justify-between gap-2">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              <span className="hidden sm:inline">View full size</span>
              <span className="sm:hidden">View</span>
            </a>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => {
                onChange(null);
                setImageError(false);
              }}
            >
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Upload Area */}
          <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/20 hover:bg-muted/30 transition-colors">
            <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">
              {uploading ? "Uploading..." : "Upload Image"}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Click button below or drag and drop
            </p>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
              id={`file-${label.replace(/\s+/g, "-")}`}
            />
            <Button 
              type="button" 
              variant="default" 
              size="sm" 
              disabled={uploading}
              onClick={() => document.getElementById(`file-${label.replace(/\s+/g, "-")}`)?.click()}
            >
              {uploading ? "Uploading..." : "Choose File"}
            </Button>
          </div>

          {/* URL Input */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {showUrlInput ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 text-sm border rounded-md bg-background"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUrlSubmit();
                }}
              />
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  size="sm" 
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim()}
                  className="flex-1 sm:flex-none"
                >
                  Add URL
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowUrlInput(false);
                    setUrlInput("");
                  }}
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowUrlInput(true)}
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Use Image URL
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
