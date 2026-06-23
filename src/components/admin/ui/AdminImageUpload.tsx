"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { UploadImageResponse } from "@/lib/api/types";
import { resolveProductImageUrl } from "@/lib/product-media";
import { resolveThumbnail } from "@/lib/thumbnails";
import { AdminAlert } from "./AdminAlert";

type AdminImageUploadProps = {
  label?: string;
  thumbnailKey: string;
  thumbnailUrl?: string;
  onChange: (key: string, url: string) => void;
  uploadFile: (file: File) => Promise<UploadImageResponse>;
};

export function AdminImageUpload({
  label = "Ảnh",
  thumbnailKey,
  thumbnailUrl,
  onChange,
  uploadFile,
}: AdminImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const previewUrl =
    resolveProductImageUrl(thumbnailUrl, thumbnailKey) || "";

  const legacySrc =
    thumbnailKey && !thumbnailKey.startsWith("uploads/")
      ? resolveThumbnail(thumbnailKey)
      : null;

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const result = await uploadFile(file);
      onChange(result.key, result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload thất bại");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="admin-field">
      <span className="admin-label">{label}</span>

      <div className="admin-thumbnail-preview">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Xem trước"
            className="h-44 w-full object-cover"
          />
        ) : legacySrc ? (
          <Image
            src={legacySrc}
            alt="Xem trước"
            width={400}
            height={176}
            className="h-44 w-full object-cover"
          />
        ) : (
          <div className="flex h-44 items-center justify-center bg-gray-100 text-sm text-gray-400">
            Chưa có ảnh — hãy tải lên
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="admin-btn-primary"
        >
          {uploading ? "Đang tải lên..." : "Chọn & tải ảnh lên"}
        </button>
        {thumbnailKey && (
          <button
            type="button"
            className="admin-btn-secondary"
            onClick={() => onChange("", "")}
          >
            Xóa ảnh
          </button>
        )}
      </div>

      <p className="admin-field-hint">
        JPEG, PNG, WebP hoặc GIF — tối đa 10MB. Ảnh sẽ được nén và chuyển sang WebP
        trên server.
      </p>

      {error && (
        <div className="mt-2">
          <AdminAlert>{error}</AdminAlert>
        </div>
      )}
    </div>
  );
}
