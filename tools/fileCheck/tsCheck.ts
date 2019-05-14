/**
 * 检查是否存在文件名重复的ts文件
 */
export function tsCheck(assets: { filepath: string; isDir: boolean }[]) {
  let isPass = true;
  const tsAssets = assets.filter(elel => elel.filepath.endsWith(".ts"));
  const map = new Map<string, string[]>();
  const checkRepeatTSFile: string[] = [];
  tsAssets.forEach(tsFiles => {
    const fileSplits = tsFiles.filepath.split("/");
    const itemFileName = fileSplits[fileSplits.length - 1];
    const repeatFiles = map.get(itemFileName);

    if (!repeatFiles) {
      map.set(itemFileName, [tsFiles.filepath]);
    } else {
      if (checkRepeatTSFile.indexOf(itemFileName) === -1) {
        checkRepeatTSFile.push(itemFileName);
      }
      repeatFiles.push(tsFiles.filepath);
    }
  });

  if (checkRepeatTSFile.length > 0) {
    isPass = false;
    console.log("以下ts文件名字重复：");

    for (const fileName of checkRepeatTSFile) {
      const fileNames = map.get(fileName);
      console.log(`${fileNames}`);
    }
  }
  return isPass;
}
