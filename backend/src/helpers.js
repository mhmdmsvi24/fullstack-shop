import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const METIS_API_URL = "https://api.metisai.ir/api/v2/generate";

// CONFIG (Budget Friendly)
const IMAGE_SIZE = "512x512"; // cheaper than 1024
const WAIT_TIME = 5000; // 5 sec polling interval
const MAX_RETRIES = 3; // retry connection errors
const OUTPUT_FILE = "data/products.updated.json";

// Helper: Sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper: Generate Prompt
function buildPrompt(product) {
  return `
Ultra realistic square lifestyle product advertisement photo of a happy young model showcasing ${product.name}.
Product description: ${product.desc}.
Bright vibrant background matching category ${product.category}.
Studio lighting, premium commercial photography, product centered and sharp focus.
Modest professional pose, no nudity, no text, no watermark.
`;
}

// Helper: Start Generation Task
async function createTask(prompt) {
  const res = await axios.post(
    METIS_API_URL,
    {
      model: {
        name: "black-forest-labs",
        model: "flux-pro",
      },
      operation: "Imagine",
      args: {
        prompt,
        size: IMAGE_SIZE,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.METIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    },
  );

  return res.data.id;
}

// Helper: Poll Until Completed
async function waitForResult(taskId) {
  while (true) {
    await sleep(WAIT_TIME);

    const res = await axios.get(`${METIS_API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${process.env.METIS_TOKEN}`,
      },
    });

    const data = res.data;

    console.log("   Status:", data.status);

    if (data.status === "COMPLETED") {
      return data.generations?.[0]?.url;
    }

    if (data.status === "ERROR") {
      throw new Error(data.error || "Generation failed");
    }
  }
}

// Main Function with Retry Logic
async function generateImageForProduct(product) {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      attempt++;

      console.log(`   Attempt ${attempt}/${MAX_RETRIES}`);

      const prompt = buildPrompt(product);

      // 1. Create Task
      const taskId = await createTask(prompt);
      console.log("   Task ID:", taskId);

      // 2. Wait for Completion
      const imageUrl = await waitForResult(taskId);

      if (!imageUrl) throw new Error("No image URL returned");

      return imageUrl;
    } catch (err) {
      console.log("   ⚠️ Error:", err.message);

      // Retry only if connection/network issue
      if (attempt < MAX_RETRIES) {
        console.log("   🔁 Retrying in 5 seconds...");
        await sleep(5000);
      } else {
        console.log("   ❌ Failed after retries.");
        return null;
      }
    }
  }
}

// Batch Process JSON File
async function processProducts() {
  const productsPath = path.join(import.meta.dirname, 'data', 'products.json');
  const raw = fs.readFileSync(productsPath, "utf8");
  const products = JSON.parse(raw);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    console.log(`\n🛒 Product ${i + 1}/${products.length}: ${product.name}`);

    // Skip if already has a real URL (optional)
    if (product.image_url && !product.image_url.includes("example.com")) {
      console.log("   ✅ Already has real image, skipping...");
      continue;
    }

    // Generate Image
    const newUrl = await generateImageForProduct(product);

    if (newUrl) {
      product.image_url = newUrl;
      console.log("🎉 New Image URL:", newUrl);
    } else {
      console.log("⚠️ Skipped due to failure.");
    }

    // Save progress after every product
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));
    console.log("   💾 Progress saved.");
  }

  console.log("\n✅ All products processed!");
}

processProducts();
