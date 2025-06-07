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

const seen = new Map();
const duplicates = [];

function collectCommands(commands, sourceFile, parentId = null) {
  for (const cmd of commands) {
    const cmdStr = cmd.command.trim();
    const location = `${sourceFile} → ${cmd.id || "(no id)"}`;
    // Use id for uniqueness if available, else fallback to command string
    const key = cmd.id || cmdStr;
    if (seen.has(key)) {
      duplicates.push({
        command: cmdStr,
        id: key,
        firstSeen: seen.get(key),
        duplicateAt: location,
      });
    } else {
      seen.set(key, location);
    }

    if (Array.isArray(cmd.variations)) {
      collectCommands(cmd.variations, sourceFile, cmd.id);
    }
  }
}

getAllJsonFiles(commandsDir).forEach((file) => {
  try {
    const content = fs.readFileSync(file, "utf-8").trim();
    if (!content) return;

    const commands = JSON.parse(content);
    collectCommands(commands, file);
  } catch (err) {
    console.error(`❌ Failed to read ${file}:`, err.message);
  }
});

if (duplicates.length === 0) {
  console.log("✅ No duplicate commands found.");
} else {
  console.log(`⚠️ Found ${duplicates.length} duplicate commands:\n`);
  duplicates.forEach(({ command, firstSeen, duplicateAt }, i) => {
    console.log(`${i + 1}. "${command}"`);
    console.log(`   ↳ First seen in: ${firstSeen}`);
    console.log(`   ↳ Duplicate in: ${duplicateAt}\n`);
  });
}
