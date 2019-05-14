import * as fs from 'fs';
import * as path from 'path';

import { getFiles } from '../utils/file';

function run() {
  const workDirectory = process.cwd();
  const allFiles = getFiles(path.join(workDirectory, "./assets/"), ".ts");
  for (const filename of allFiles) {
    const content = fs.readFileSync(filename).toString();
    const importMatches = content.match(/import[^;]+;/g);
    if (importMatches) {
      for (const importMatch of importMatches) {
        const relativeMatch = importMatch.match(/("|').+("|')/);
        if (relativeMatch) {
          const relative = relativeMatch[0].substr(
            1,
            relativeMatch[0].length - 2
          );
          const result = path.relative(
            workDirectory,
            `${path.join(path.dirname(filename), relative)}.ts`
          );
          if (!result.startsWith("assets")) {
            const firstLine = importMatch.split("\n")[0];
            const lines = content.split("\n");
            const lineIndex = lines.findIndex(line => line.includes(firstLine));
            if (!lines[lineIndex].trim().startsWith("//")) {
              console.warn(`${filename}:${lineIndex + 1}`);
            }
            // process.exit();
          }
        }
      }
    }
  }
}

run();
