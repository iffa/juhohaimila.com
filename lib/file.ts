import { readdir } from "fs/promises";
import path from "path";
const root = process.cwd();

export async function getFiles(
  dataFolder: string,
  type: string
): Promise<string[]> {
  return await readdir(path.join(root, dataFolder, type));
}
