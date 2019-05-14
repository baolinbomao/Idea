import * as fs from 'fs';

/**
 * 检查是否存在重复的uuid
 */
export function uuidCheck(uuidAssets: { filepath: string; isDir: boolean }[]) {
  const map = new Map<string, string[]>();
  let isPass = true;
  const repeatUuid: string[] = [];

  uuidAssets.forEach(element => {
    const config = JSON.parse(fs.readFileSync(element.filepath).toString());
    const uuid = config.uuid;
    const getter = map.get(uuid);
    if (!getter) {
      map.set(uuid, [element.filepath]);
    } else {
      if (!repeatUuid.includes(uuid)) {
        repeatUuid.push(uuid);
      }
      getter.push(element.filepath);
    }
  });

  if (repeatUuid.length > 0) {
    isPass = false;
    console.log("以下文件uuid重复");
    for (const uuid of repeatUuid) {
      const paths = map.get(uuid);
      console.log(paths);
    }
  }
  return isPass;
}
