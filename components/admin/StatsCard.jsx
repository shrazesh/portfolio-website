export default function StatsCard({
  title,
  value,
  icon,
  color = "bg-white",
}) {
  return (
    <div
      className={`${color} rounded-2xl shadow-lg p-6 hover:shadow-xl transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-5xl">
          {icon}
        </div>
      </div>
    </div>
  );
}