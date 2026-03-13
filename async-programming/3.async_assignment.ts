import fs from "fs";
/**Re implement the above functions this time as async functions along with await, and test them using async await based promise consumption */

export async function getFileType(
  path: string,
): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  try {
    const stats = await fs.promises.stat(path);

    if (stats.isFile()) return "FILE";
    else if (stats.isDirectory()) return "DIRECTORY";
    else return "OTHER";
  } catch (err) {
    throw new Error("file system error", { cause: err });
  }
}

//test using async
async function test1() {
  try {
    const result1 = await getFileType("../async-programming");
    console.log(result1);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
  try {
    const result2 = await getFileType("2.async_assignment.ts");
    console.log(result2);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
  try {
    const result3 = await getFileType("newfile.ts");
    console.log(result3);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}
test1();

//2
export async function getContents(path: string): Promise<string | string[]> {
  try {
    const result = await getFileType(path);
    switch (result) {
      case "FILE":
        return path;
      case "DIRECTORY": {
        const files = await fs.promises.readdir(path);
        return files;
      }
      case "OTHER":
        return path;
    }
  } catch (err) {
    throw new Error("file system error", { cause: err });
  }
}

//testing
async function test2() {
  try {
    const result1 = await getContents("../async-programming");
    console.log(result1);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
  try {
    const result2 = await getContents("2.async_assignment.ts");
    console.log(result2);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
  try {
    const result3 = await getContents("newfile.ts");
    console.log(result3);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

test2();

//3
export async function getSize(path: string): Promise<number> {
  try {
    const stats = await fs.promises.stat(path);
    const result = await getContents(path);
    //gives file name if it is file or gives string array if it is folder (it helpful when our folder as multiple folder)
    if (Array.isArray(result)) //if it is folder
    {
      if (result.length === 0) {
        return 0;
      }
      let folderSize = 0;
      for (const files of result) {
        //forEach will not wait so used for of
        const fileSize = await getSize(`${path}/${files}`); //using recursion passing each file name to get size
        folderSize += fileSize;
      }
      return folderSize;
    } else return stats.size;
  } catch (err) {
    throw new Error("file system error", { cause: err });
  }
}

async function test3() {
  try {
    const result1 = await getSize("../async-programming");
    console.log(result1);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
  try {
    const result2 = await getSize("2.async_assignment.ts");
    console.log(result2);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
  try {
    const result3 = await getSize("newfile.ts");
    console.log(result3);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

test3();
