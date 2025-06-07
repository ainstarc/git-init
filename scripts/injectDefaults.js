const fs = require("fs");
const path = require("path");

const commandsDir = path.resolve(__dirname, "../src/data/gitCommands");

const expectedFields = {
  description: "",
  category: "",
  keywords: [],
  level: "",
  example: null, // fallback to command
  related: [],
  variations: [],
  id: "", // will be set later
};

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

function applyDefaults(command, index, filename) {
  if (!command.command) {
    throw new Error(`Missing 'command' in ${filename} at index ${index}`);
  }

  const injected = { command: command.command };

  // Copy all keys except category and example with default fallback
  for (const key in expectedFields) {
    if (key === "category") continue; // skip here, will overwrite later
    if (key === "example") {
      injected.example = command.example ?? command.command;
      continue;
    }
    injected[key] = command[key] ?? expectedFields[key];
  }

  // Overwrite category unconditionally
  injected.category = filename;

  if (Array.isArray(command.variations)) {
    injected.variations = command.variations.map((variation, vIndex) => {
      const vInjected = { command: variation.command };

      for (const key in expectedFields) {
        if (key === "category") continue; // skip here
        if (key === "example") {
          vInjected.example = variation.example ?? variation.command;
          continue;
        }
        vInjected[key] = variation[key] ?? expectedFields[key];
      }

      // Overwrite category and set id
      vInjected.category = filename;
      vInjected.id = `${filename}-${index + 1}-v${vIndex + 1}`;

      return vInjected;
    });
  }

  // Set id for main command
  injected.id = `${filename}-${index + 1}`;

  return injected;
}

let grandTotal = 0;

function injectDefaultsToFile(filePath) {
  const fileName = path.basename(filePath, ".json");

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8").trim();

    if (!fileContent) {
      console.warn(`⚠️ Skipping empty file: ${fileName}.json`);
      return;
    }

    const commands = JSON.parse(fileContent);
    const updated = commands.map((cmd, i) => applyDefaults(cmd, i, fileName));
    const totalCount = countAllCommands(updated);

    grandTotal += totalCount;

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    console.log(`✅ Updated: ${fileName}.json — Commands (with variations): ${totalCount}`);
  } catch (error) {
    console.error(`❌ Failed: ${fileName}.json — ${error.message}`);
  }
}

fs.readdirSync(commandsDir)
  .filter((file) => file.endsWith(".json"))
  .forEach((file) => {
    injectDefaultsToFile(path.join(commandsDir, file));
  });

console.log(`\n🧮 Grand Total Commands (with all variations): ${grandTotal}`);
if (grandTotal === 0) {
  console.warn("⚠️ No commands found. Please check your JSON files.");
}