// app/not-found.js

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <a
        href="/"
        className="px-6 py-3 bg-black text-white rounded-md"
      >
        Go Home
      </a>
    </div>
  );
}