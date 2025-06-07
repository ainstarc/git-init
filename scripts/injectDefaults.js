const fs = require("fs");
const path = require("path");

const commandsDir = path.resolve(__dirname, "../src/data/gitCommands");

function getAllJsonFiles(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getAllJsonFiles(fullPath));
    } else if (entry.endsWith(".json") && entry !== "phrases.json") {
      files.push(fullPath);
    }
  }
  return files;
}

function countAllCommands(commands) {
  let count = 0;
  function countRecursive(cmdList) {
    for (const cmd of cmdList) {
      count++;
      if (Array.isArray(cmd.variations)) {
        countRecursive(cmd.variations);
      }
    }
  }
  countRecursive(commands);
  return count;
}

// Helper to deeply enrich all commands and their variations
function enrichCommand(cmd, fileName, parentId = null, index = 0) {
  // Ensure all required fields
  const enriched = {
    ...cmd,
    description: cmd.description || "No description provided.",
    category: fileName,
    keywords: Array.isArray(cmd.keywords) ? cmd.keywords : [],
    level: cmd.level || "basic",
    example: cmd.example || cmd.command,
    related: Array.isArray(cmd.related) ? cmd.related : [],
    id: parentId ? `${parentId}-var${index + 1}` : `${fileName}-${index + 1}`,
    variations: [],
  };
  // Recursively enrich variations
  if (Array.isArray(cmd.variations) && cmd.variations.length > 0) {
    enriched.variations = cmd.variations.map((v, i) =>
      enrichCommand(v, fileName, enriched.id, i)
    );
  }
  return enriched;
}

let grandTotal = 0;

function injectDefaultsToFile(filePath) {
  const fileName = path.basename(filePath, ".json");
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8").trim();
    if (!fileContent) {
      console.warn(`⚠️ Skipping empty file: ${fileName}`);
      return;
    }
    const commands = JSON.parse(fileContent);
    const updated = commands.map((cmd, i) => enrichCommand(cmd, fileName, null, i));
    const totalCount = countAllCommands(updated);
    grandTotal += totalCount;
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    console.log(`✅ Updated: ${fileName}.json — Commands (with variations): ${totalCount}`);
  } catch (error) {
    console.error(`❌ Failed: ${fileName}.json — ${error.message}`);
  }
}

getAllJsonFiles(commandsDir).forEach((file) => {
  injectDefaultsToFile(file);
});

console.log(`\n🧮 Grand Total Commands (with all variations): ${grandTotal}`);
if (grandTotal === 0) {
  console.warn("⚠️ No commands found. Please check your JSON files.");
}