import ImageUploader from './components/ImageUploader';

export default function ImageUploaderHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Image Analysis with LLaVA</h1>
      <ImageUploader />
    </main>
  );
}
