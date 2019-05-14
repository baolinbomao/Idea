/**
 * 检查文件名的合法性
 */
export function fileNameCheck(assets: { filepath: string; isDir: boolean }[]) {
  const regex = /^[A-Z0-9a-z()~_./+-@&]*$/;
  let isPass = true;
  for (const path of assets) {
    if (path.filepath.endsWith(".9.png")) {
      isPass = false;
      console.log(`包含.9.png：${path}`);
    }
    if (path.filepath.endsWith(".9.png.meta")) {
      isPass = false;
      console.log(`包含.9.png.meta：${path}`);
    }
    if (!regex.test(path.filepath)) {
      isPass = false;
      console.log(`包含非法字符(不区分大小写)：${path.filepath}`);
    }
  }
  return isPass;
}
