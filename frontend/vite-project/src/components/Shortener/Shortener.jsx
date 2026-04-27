import { useState } from "react";
import { shortenUrl } from "../../services/api";
import toast from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";

function Shortener() {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // 🔥 Copy handler
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success("Copied to clipboard!");

    setTimeout(() => setCopied(false), 1500);
  };

  // 🔥 Submit handler
  const handleSubmit = async () => {
    if (!url) {
      setError("Please enter a URL");
      toast.error("URL is required");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const data = await shortenUrl(url, customCode);
      setShortUrl(data.shortUrl);

      toast.success("Short URL created 🎉");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        🚀 Create Short Link
      </h2>

      {/* URL Input */}
      <input
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-3
focus:outline-none focus:ring-2 focus:ring-blue-400
bg-white dark:bg-gray-700 text-gray-800 dark:text-white
placeholder-gray-400 dark:placeholder-gray-300"
        type="text"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      {/* Custom Code */}
      <input
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-3
focus:outline-none focus:ring-2 focus:ring-blue-400
bg-white dark:bg-gray-700 text-gray-800 dark:text-white
placeholder-gray-400 dark:placeholder-gray-300"
        type="text"
        placeholder="Custom code (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      />

      {/* Button */}
      <button
        className={`w-full sm:w-auto px-4 py-3 rounded-lg font-medium transition-all duration-200
  ${
    loading
      ? "bg-blue-300 cursor-not-allowed"
      : "bg-blue-500 hover:bg-blue-600 active:scale-95 text-white"
  }`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Shorten URL"}
      </button>

      {/* Output */}
      {shortUrl && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg animate-fadeIn">
          <p className="text-sm text-gray-500 mb-2">Short URL</p>

          {/* 🔥 Inline layout */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white border rounded-lg px-3 py-2">
            <a
              className="text-blue-600 font-medium break-all"
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
            >
              {shortUrl}
            </a>

            <button
              onClick={handleCopy}
              className={`ml-3 px-3 py-1 rounded-md text-sm transition
              ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {copied ? "✔" : "Copy"}
            </button>
          </div>
          {/* 🔥 QR BELOW (correct place) */}
          <div className="mt-4 flex justify-center">
            <QRCodeCanvas value={shortUrl} size={140} />
          </div>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}

export default Shortener;
