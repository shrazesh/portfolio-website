"use client";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}