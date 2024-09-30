// ImageUploaderLayout.tsx

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Image Uploader",
  description: "Upload your images easily",
};

export default function ImageUploaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

        {children}
      </body>
    </html>
  );
}
