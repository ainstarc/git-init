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

  for (const key in expectedFields) {
    if (command[key] === undefined || command[key] === null || command[key] === "") {
      if (key === "category") {
        injected[key] = filename;
      } else if (key === "example") {
        injected[key] = command.command;
      } else {
        injected[key] = expectedFields[key];
      }
    } else {
      injected[key] = command[key];
    }
  }

  if (Array.isArray(command.variations)) {
    injected.variations = command.variations.map((variation, vIndex) => {
      const vInjected = { command: variation.command };

      for (const key in expectedFields) {
        if (variation[key] === undefined || variation[key] === null) {
          if (key === "category") {
            vInjected[key] = filename;
          } else if (key === "example") {
            vInjected[key] = variation.command;
          } else {
            vInjected[key] = expectedFields[key];
          }
        } else {
          vInjected[key] = variation[key];
        }
      }

      vInjected.id = `${filename}-${index + 1}-v${vIndex + 1}`;
      return vInjected;
    });
  }

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
