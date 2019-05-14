import * as fs from 'fs';
import * as path from 'path';

import { metaCheck } from './fileMetaCheck';
import { fileNameCheck } from './fileNameCheck';
import { uuidCheck } from './fileUuidCheck';
import { tsCheck } from './tsCheck';

function getAllFiles(root: string): { filepath: string; isDir: boolean }[] {
  const ret: { filepath: string; isDir: boolean }[] = [];
  function walk(root: string) {
    const state = fs.statSync(root);
    if (state.isDirectory()) {
      ret.push({ filepath: root, isDir: true });
      const files = fs.readdirSync(root);
      for (const file of files) {
        walk(path.join(root, file));
      }
    } else {
      ret.push({ filepath: root, isDir: false });
    }
  }
  walk(root);
  return ret;
}

const dirPath = path.resolve("assets");

const assets = getAllFiles(dirPath);
const uuidAssets = assets.filter(elel => elel.filepath.endsWith(".meta"));
let isPass = true;

/**
 * @description
 * step1: 检查所有文件名的合法性  fileNameCheck
 * step2: 检查是否存在重复的uuid  uuidCheck
 * step3: 检查是否meta问题  metaCheck
 * step4: 检查是否存在文件名重复的ts文件  tsCheck
 */
const fileCheck = () => {
  if (
    !(
      metaCheck(assets, dirPath) &&
      uuidCheck(uuidAssets) &&
      tsCheck(assets) &&
      fileNameCheck(assets)
    )
  ) {
    isPass = false;
  }
  if (!isPass) throw new Error("file check failed");
};
fileCheck();
