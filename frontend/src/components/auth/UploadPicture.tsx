import React, { useRef, useState, type ChangeEvent } from "react";

// Cloudinary config
const CLOUDINARY_UPLOAD_PRESET = String(
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
);
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

const UploadPicture = ({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string | undefined;
  setImageUrl: (value: string) => void;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [publicId, setPublicId] = useState<string>("");

  const handleFileSelect = () => {
    if (imageUrl) return;
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ MIME TYPE CHECK (Only Images)
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    // ✅ EXTENSION CHECK (Extra Security)
    const allowedExtensions = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "bmp",
      "svg",
    ];

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!extension || !allowedExtensions.includes(extension)) {
      alert("Only image files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      setIsUploading(true);
      setImageUrl("");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
        setPublicId(data.public_id);
      } else {
        console.error("Upload failed", data);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!publicId || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) return;

    const timestamp = Math.floor(Date.now() / 1000);
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;

    const sha1 = await crypto.subtle.digest(
      "SHA-1",
      new TextEncoder().encode(stringToSign)
    );

    const signature = Array.from(new Uint8Array(sha1))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const body = new URLSearchParams();
    body.append("public_id", publicId);
    body.append("api_key", CLOUDINARY_API_KEY);
    body.append("timestamp", timestamp.toString());
    body.append("signature", signature);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        }
      );

      const result = await res.json();

      if (result.result === "ok") {
        setImageUrl("");
        setPublicId("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Upload Button */}
      <button
        onClick={handleFileSelect}
        disabled={isUploading || !!imageUrl}
        className="
        flex items-center gap-2
        px-4 py-2
        rounded-lg
        bg-gradient-to-r from-blue-600 to-indigo-600
        text-white text-sm font-medium
        shadow-md
        hover:from-blue-700 hover:to-indigo-700
        hover:shadow-lg
        active:scale-95
        transition-all duration-200
        disabled:from-gray-300 disabled:to-gray-300
        disabled:text-gray-500 disabled:shadow-none
        disabled:cursor-not-allowed
        cursor-pointer
        "
        title="Upload Image"
        type="button"
      >
        {isUploading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Uploading…
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v7m0-7l-3 3m3-3l3 3m0-9a4 4 0 00-8 0"
              />
            </svg>
            Upload Image
          </>
        )}
      </button>

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Preview */}
      {imageUrl && !isUploading && (
        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-200">
          {/* Image Preview */}
          <div className="relative">
            <img
              src={imageUrl}
              alt="Uploaded preview"
              className="w-12 h-12 rounded-md object-cover shadow-sm"
            />

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              title="Remove image"
              className="
                absolute -top-2 -right-2
                w-5 h-5
                flex items-center justify-center  
                rounded-full
                bg-red-500 text-white text-xs
                shadow-md
                hover:bg-red-600
                transition
                cursor-pointer
              "
              type="button"
            >
              ✕
            </button>
          </div>

          {/* Info text */}
          <span className="text-xs text-gray-600">Image uploaded</span>
        </div>
      )}
    </div>
  );
};

export default UploadPicture;
