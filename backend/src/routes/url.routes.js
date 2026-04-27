const express = require("express");
const router = express.Router();
const {
  shortenUrl,
  redirectUrl,
  getAnalytics,
  getTopAnalytics,
} = require("../controllers/url.controller");


router.post("/shorten", shortenUrl);
router.get("/analytics/top", getTopAnalytics);
router.get("/analytics/:shortCode", getAnalytics);
router.get("/:shortCode", redirectUrl);

module.exports = router;
