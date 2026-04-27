import { useState } from "react";
import { getAnalytics } from "../../services/api";

function Analytics() {
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      setError("");
      const res = await getAnalytics(code);
      setData(res);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-gray-700">
      📊 Analytics
    </h2>

    <input
      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-3
focus:outline-none focus:ring-2 focus:ring-green-400
bg-white dark:bg-gray-700 text-gray-800 dark:text-white
placeholder-gray-400 dark:placeholder-gray-300"
      type="text"
      placeholder="Enter short code"
      value={code}
      onChange={(e) => setCode(e.target.value)}
    />

    <button
  className="w-full px-4 py-3 rounded-lg font-medium bg-green-500 hover:bg-green-600 active:scale-95 text-white transition-all"
>
  Get Analytics
</button>

    {data && (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg space-y-2">
        <p className="text-sm text-gray-500">Original URL</p>
        <p className="font-medium break-all">{data.originalUrl}</p>

        <p className="text-sm text-gray-500 mt-2">Clicks</p>
        <p className="text-lg font-bold text-green-600">
          {data.clicks}
        </p>
      </div>
    )}

    {error && (
      <p className="text-red-500 mt-3">{error}</p>
    )}
  </div>
);
}

export default Analytics;