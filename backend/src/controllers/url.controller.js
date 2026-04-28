const {
  createShortUrl,
  getOriginalUrl,
  getUrlAnalytics,
  getTopUrls,
} = require("../services/url.service");


const shortenUrl = async (req, res) => {
  try {
    const { url, customCode } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const result = await createShortUrl(url, customCode);

    res.json({
      shortUrl: `${process.env.BASE_URL}/${result.shortCode}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const originalUrl = await getOriginalUrl(shortCode);

    if (!originalUrl) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.redirect(originalUrl);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const data = await getUrlAnalytics(shortCode);

    if (!data) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



const getTopAnalytics = async (req, res) => {
  try {
    const data = await getTopUrls();

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { shortenUrl, redirectUrl, getAnalytics, getTopAnalytics };
