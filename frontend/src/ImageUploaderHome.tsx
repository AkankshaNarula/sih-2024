import React from 'react';
import ImageUploader from './components/ImageUploader';
import type { Metadata } from "next";
import "./globals.css";

// Metadata for the page
export const metadata: Metadata = {
  title: "Image Analysis with LLaVA",
  description: "Analyze images with LLaVA technology.",
};

// Layout component that wraps ImageUploaderHome
function ImageUploaderHomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

// Main component for ImageUploaderHome
const ImageUploaderHome: React.FC = () => {
  return (
    <ImageUploaderHomeLayout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold mb-8">Image Analysis with LLaVA</h1>
        <ImageUploader />
      </main>
    </ImageUploaderHomeLayout>
  );
};

export default ImageUploaderHome;
