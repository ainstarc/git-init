const fs = require("fs");
const path = require("path");

const commandsDir = path.resolve(__dirname, "../src/data/gitCommands");

const seen = new Map();
const duplicates = [];

function collectCommands(commands, sourceFile, parentId = null) {
  for (const cmd of commands) {
    const cmdStr = cmd.command.trim();
    const location = `${sourceFile} → ${cmd.id || "(no id)"}`;

    if (seen.has(cmdStr)) {
      duplicates.push({
        command: cmdStr,
        firstSeen: seen.get(cmdStr),
        duplicateAt: location,
      });
    } else {
      seen.set(cmdStr, location);
    }

    if (Array.isArray(cmd.variations)) {
      collectCommands(cmd.variations, sourceFile, cmd.id);
    }
  }
}

fs.readdirSync(commandsDir)
  .filter((file) => file.endsWith(".json") && file !== "phrases.json")
  .forEach((file) => {
    const filePath = path.join(commandsDir, file);
    try {
      const content = fs.readFileSync(filePath, "utf-8").trim();
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
