import { useState } from "react";
import Shortener from "./components/Shortener/Shortener";
import Analytics from "./components/Analytics/Analytics";
import TopAnalytics from "./components/TopAnalytics/TopAnalytics";
import { Toaster } from "react-hot-toast";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div
  className={`min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 py-8 sm:py-10 gap-6 ${
    darkMode ? "bg-gray-900" : "bg-gray-100"
  } transition`}
>
      {/* Header */}
      <h1 className={`text-2xl sm:text-4xl font-bold mb-6 text-center ${darkMode ? "text-white" : "text-gray-800"}`}>
        🔗 URL Shortener
      </h1>
      <button
  onClick={() => setDarkMode(!darkMode)}
  className="mb-4 px-4 py-2 rounded-lg bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
>
  Toggle Dark Mode
</button>

      {/* Main Container */}
      <div className="w-full max-w-md sm:max-w-xl space-y-6 mt-4">
        {/* Shortener Card */}
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-2xl shadow-lg transition">
          <Shortener />
        </div>

        {/* Analytics Card */}
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-2xl shadow-lg transition">
          <Analytics />
        </div>

        {/* Top Analytics Card */}
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-2xl shadow-lg transition">
          <TopAnalytics />
        </div>
      </div>
    </div>
  );
}

export default App;
