'use client';

import { useState, ChangeEvent } from 'react';
import { Button, Input } from '@nextui-org/react';

export default function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (typeof e.target?.result === 'string') {
          setImage(e.target.result);
          setError(null); // Clear any previous errors
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze image');
      }
      
      if (typeof data.result !== 'string') {
        throw new Error('Invalid response from server');
      }

      setAnalysis(data.result);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setAnalysis('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4"> {/* Centering and padding */}
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
        isClearable
      />
      {image && (
        <div className="mb-4">
          <img src={image} alt="Uploaded" style={{ width: '300px', height: '300px' }} />
        </div>
      )}
      <Button
        onClick={analyzeImage}
        disabled={!image || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {loading ? 'Analyzing...' : 'Analyze Image'}
      </Button>
      {error && (
        <div className="mt-4 text-red-500">
          Error: {error}
        </div>
      )}
      {analysis && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Analysis Result:</h2>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
}
