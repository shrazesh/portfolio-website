import Link from "next/link";

export default function QuickAction({
  href,
  title,
  description,
  color,
}) {
  return (
    <Link href={href}>
      <div
        className={`${color} rounded-xl p-6 shadow hover:scale-105 transition cursor-pointer`}
      >
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="mt-2 text-sm opacity-90">
          {description}
        </p>
      </div>
    </Link>
  );
}