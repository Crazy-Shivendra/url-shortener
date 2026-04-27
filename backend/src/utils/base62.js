const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encode(num) {
  let base = chars.length; // 62
  let shortCode = "";

  while (num > 0) {
    shortCode = chars[num % base] + shortCode;
    num = Math.floor(num / base);
  }

  return shortCode || "0";
}

module.exports = { encode };
