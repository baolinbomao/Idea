import * as fs from 'fs';
import * as path from 'path';

function createDirectory(direcotry: string) {
  if (!fs.existsSync(direcotry)) {
    createDirectory(path.dirname(direcotry));
    fs.mkdirSync(direcotry);
  }
}

export function writeStringFoFile(params: {
  directory?: string;
  path: string;
  content: string;
}) {
  const filename = params.directory
    ? path.join(params.directory, params.path)
    : params.path;
  createDirectory(path.dirname(filename));
  fs.writeFileSync(filename, params.content);
}

export function readStringFromFile(params: {
  directory?: string;
  path: string;
}) {
  const filename = params.directory
    ? path.join(params.directory, params.path)
    : params.path;
  return fs.existsSync(filename) ? fs.readFileSync(filename).toString() : "";
}

export function writeObjectFoFile(params: {
  directory?: string;
  path: string;
  content: any;
}) {
  const filename = params.directory
    ? path.join(params.directory, params.path)
    : params.path;
  createDirectory(path.dirname(filename));
  fs.writeFileSync(filename, params.content);
}

export function enumerateDirectory(
  directory: string,
  callback: (filename: string) => void
) {
  if (fs.existsSync(directory)) {
    for (const name of fs.readdirSync(directory)) {
      const filename = path.join(directory, name);
      const state = fs.statSync(filename);
      if (state.isFile()) {
        callback(filename);
      } else {
        enumerateDirectory(filename, callback);
      }
    }
  }
}

export async function enumerateDirectoryAsync(
  directory: string,
  callback: (filename: string) => Promise<any>
) {
  for (const name of fs.readdirSync(directory)) {
    const filename = path.join(directory, name);
    const state = fs.statSync(filename);
    if (state.isFile()) {
      await callback(filename);
    } else {
      await enumerateDirectoryAsync(filename, callback);
    }
  }
}

/**
 * 递归找出指定路径下所有文件
 * @param directory 目录路径
 * @param extension 后缀名
 */
export function getFiles(directory: string, extension?: string) {
  const files: string[] = [];
  enumerateDirectory(directory, filename => {
    files.push(filename);
  });
  return extension
    ? files.filter(filename => filename.endsWith(extension))
    : files;
}
