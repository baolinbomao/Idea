/**
 * 检查是否存在meta问题 meta无对应源文件或文件没有对应meta
 */
export function metaCheck(
  assets: { filepath: string; isDir: boolean }[],
  dirPath: string
) {
  const whiteList = [".DS_Store", ".gitkeep"];
  let isPass = true;
  const map = new Map<string, boolean>();
  assets.forEach(element => {
    const filepath = element.filepath;
    if (
      !filepath.endsWith(whiteList[0]) &&
      !filepath.endsWith(whiteList[1]) &&
      filepath !== dirPath
    ) {
      map.set(element.filepath, true);
    }
  });
  // 文件没有对应meta文件
  const unMetaAssets: string[] = [];
  // meta文件没有对应文件
  const unOriginAssets: string[] = [];
  map.forEach((value, key) => {
    // meta文件判断对应文件
    let fileName = "";
    if (key.endsWith(".meta")) {
      //
      fileName = key.substring(0, key.length - 5);

      // 判断对应的文件
      const getter = map.get(fileName);
      if (!getter) {
        unOriginAssets.push(key);
      }
    } else {
      fileName = `${key}.meta`;
      const getter = map.get(fileName);
      if (!getter) {
        unMetaAssets.push(key);
      }
    }
  });

  if (unMetaAssets.length > 0) {
    isPass = false;
    console.log("以下文件没有对应的meta文件");
    console.log(unMetaAssets);
  }
  if (unOriginAssets.length > 0) {
    isPass = false;
    console.log("以下meta文件没有对应的文件");
    console.log(unOriginAssets);
  }
  return isPass;
}
