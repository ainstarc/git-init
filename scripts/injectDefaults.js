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
};

function applyDefaults(command, index, filename) {
  if (!command.command) {
    throw new Error(`Missing 'command' in ${filename} at index ${index}`);
  }

  const injected = { command: command.command };

  for (const key in expectedFields) {
    if (command[key] === undefined || command[key] === null || command[key] === "") {
      // If the field is missing, inject the default value
      if (key === "category") {
        // Inject category based on filename if missing
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

  injected.id = `${filename}-${index + 1}`;

  return injected;
}

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

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    console.log(`✅ Updated: ${fileName}.json`);
  } catch (error) {
    console.error(`❌ Failed: ${fileName}.json — ${error.message}`);
  }
}

fs.readdirSync(commandsDir)
  .filter((file) => file.endsWith(".json"))
  .forEach((file) => {
    injectDefaultsToFile(path.join(commandsDir, file));
  });
