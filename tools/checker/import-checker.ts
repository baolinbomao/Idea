import * as child_process from 'child_process';
import * as path from 'path';

if (!process.argv || process.argv.length < 3) {
  console.error("No argument(s) specified for file(s) to search!");
  process.exit();
}

for (const filename of process.argv.slice(2)) {
  const usages: string[] = [];
  const result = child_process
    .execSync(
      `ack -i -l --ts ${path.basename(filename, path.extname(filename))}`
    )
    .toString();
  for (const line of result.split("\n").map(l => l.trim())) {
    if (!line || line.endsWith(".meta")) continue;
    const match = line.match(/C[0-9]+\/[LE][0-9]+/);
    if (match) {
      usages.push(line);
    }
  }
  console.log(`The script [${filename}] maybe imported in:`);
  usages.forEach(u => console.log(u));
  console.log();
}
