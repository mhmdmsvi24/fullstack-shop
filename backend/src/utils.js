const fs = require("fs");

exports.readJSON = (path, name) => {
  try {
    const raw = fs.readFileSync(`${path}/${name}`, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading JSON:", err);
    return []; // fallback
  }
}
