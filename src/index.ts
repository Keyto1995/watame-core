import JSON5 from "json5";
const fs = require("fs").promises;
import path from "path";

async function mapDir(dir: string): Promise<string[]> {
  const result = [];
  const files = await fs.readdir(dir);
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const pathname = path.join(dir, filename);
    const stats = await fs.stat(pathname);
    if (stats.isDirectory()) {
      const res = await mapDir(pathname);
      result.push(...res);
    } else if (stats.isFile()) {
      if ([".json5"].includes(path.extname(pathname))) {
        result.push(pathname);
      }
    }
  }
  return result;
}
let fileDirectory = ".";
import { IApiDetail } from "./InterfaceList";
mapDir(fileDirectory).then((data) => {
  data.forEach(async (pathname) => {
    const data = await fs.readFile(pathname, "utf-8");
    console.log(data);
    let j: IApiDetail = JSON5.parse(data);
    console.log(j);
  });
});
