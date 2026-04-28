// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_URL; // later env me daalenge

// 🔹 1. Shorten URL
export const shortenUrl = async (url, customCode) => {
  try {
    const res = await fetch(`${BASE_URL}/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, customCode }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to shorten URL");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

// 🔹 2. Get single analytics
export const getAnalytics = async (shortCode) => {
  try {
    const res = await fetch(`${BASE_URL}/analytics/${shortCode}`);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Analytics fetch failed");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

// 🔹 3. Get top analytics
export const getTopAnalytics = async () => {
  try {
    const res = await fetch(`${BASE_URL}/analytics/top`);

    if (!res.ok) {
      throw new Error("Failed to fetch top analytics");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};
