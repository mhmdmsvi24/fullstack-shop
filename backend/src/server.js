import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

let server;

function shutdown(err) {
  console.error("FATAL:", err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }

  setTimeout(() => process.exit(1), 5000);
}

process.on("unhandledRejection", shutdown);
process.on("uncaughtException", shutdown);

async function main() {
  await mongoose.connect(process.env.MONGO_TEST_URL);
  console.log("---MongoDB OK---");

  server = app.listen(process.env.PORT, () => {
    console.log(`---Server OK--- Port: ${process.env.PORT}`);
  });
}

main().catch(shutdown);
