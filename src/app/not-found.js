import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-9xl font-bold mb-4">404 Not Found</h1>
      <p className="text-gray-600 text-xl mb-8">
        Your visited page not found. You may go home page.
      </p>
      <Link
        href="/"
        className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
      >
        Back to home page
      </Link>
    </div>
  );
}