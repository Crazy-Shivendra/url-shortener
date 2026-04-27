import { useState } from "react";
import { getTopAnalytics } from "../../services/api";

function TopAnalytics() {
  const [data, setData] = useState([]);

  const fetchTop = async () => {
    try {
      const res = await getTopAnalytics();
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

 return (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-gray-700">
      🔥 Top Links
    </h2>

    <button
      className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition mb-4"
      onClick={fetchTop}
    >
      Load Top Links
    </button>

    <div className="space-y-3">
      {data.map((item, index) => (
        <div
          key={index}
          className="p-3 bg-gray-100 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="font-medium text-blue-600">
              {item.shortCode}
            </p>
            <p className="text-sm text-gray-500">
              {item.originalUrl}
            </p>
          </div>

          <span className="font-bold text-purple-600">
            {item.clicks}
          </span>
        </div>
      ))}
    </div>
  </div>
);
}

export default TopAnalytics;