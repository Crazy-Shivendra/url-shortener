const Url = require("../models/url.model");
const { encode } = require("../utils/base62");
const { redisClient } = require("../config/redis");

const createShortUrl = async (originalUrl, customCode) => {
  // 🔥 1. Agar customCode diya hai
  if (customCode) {
    const existing = await Url.findOne({ shortCode: customCode });

    if (existing) {
      throw new Error("Custom code already in use");
    }

    const newUrl = await Url.create({
      shortCode: customCode,
      originalUrl,
    });

    return newUrl;
  }

  // 🔥 2. warna normal flow
  const id = Date.now();
  const shortCode = encode(id);

  const newUrl = await Url.create({
    shortCode,
    originalUrl,
  });

  return newUrl;
};

const getOriginalUrl = async (shortCode) => {
  // 🔥 1. Check Redis first
  const cachedUrl = await redisClient.get(shortCode);

  if (cachedUrl) {
    
    return cachedUrl;
  }

  

  // 🔥 2. DB lookup
  const urlDoc = await Url.findOne({ shortCode });

  if (!urlDoc) return null;

  // 🔥 3. Save in Redis (cache)
  await redisClient.set(shortCode, urlDoc.originalUrl, {
    EX: 3600, // 1 hour expiry
  });

  // 🔥 4. Increment clicks
  urlDoc.clicks += 1;
  await urlDoc.save();

  return urlDoc.originalUrl;
};

const getUrlAnalytics = async (shortCode) => {
  const urlDoc = await Url.findOne({ shortCode });

  if (!urlDoc) return null;

  return {
    shortCode: urlDoc.shortCode,
    originalUrl: urlDoc.originalUrl,
    clicks: urlDoc.clicks,
    createdAt: urlDoc.createdAt,
    updatedAt: urlDoc.updatedAt,
  };
};

const getTopUrls = async (limit = 5) => {
  const urls = await Url.find()
    .sort({ clicks: -1 }) // descending
    .limit(limit);

  return urls.map((url) => ({
    shortCode: url.shortCode,
    originalUrl: url.originalUrl,
    clicks: url.clicks,
  }));
};

module.exports = {
  createShortUrl,
  getOriginalUrl,
  getUrlAnalytics,
  getTopUrls,
};

module.exports = { createShortUrl, getOriginalUrl, getUrlAnalytics, getTopUrls };
