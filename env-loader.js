// Preloads NEXT_PORT from .env and maps it to PORT
// so Next.js CLI picks it up before commander parses args.
const fs = require("fs");
const path = require("path");

try {
  const envPath = path.resolve(process.cwd(), ".env");
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key === "NEXT_PORT" && !process.env.PORT) {
      process.env.PORT = rest.join("=").replace(/^["']|["']$/g, "");
    }
  }
} catch (_) {
  // .env not found — use default port
}
