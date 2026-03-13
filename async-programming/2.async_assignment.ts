import fs from "node:fs";
/**
 *
 * Re implement the function mentioned in question 1 above, by using the promise based  fs module APIs.  Do not use async await yet.
 * @param path
 * @returns type of the file
 */
export function getFileType(path: string): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  return new Promise((resolve, reject) => {
    fs.promises
      .stat(path)
      .then((stats) => {
        if (stats.isFile()) resolve("FILE");
        else if (stats.isDirectory()) resolve("DIRECTORY");
        else resolve("OTHER");
      })
      .catch(() => reject(new Error("file system error")));
  });
}

getFileType("../async-programming")
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));
getFileType("2.async_assignment.ts")
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));
getFileType("newfile.ts")
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));

//function that gets you the file path of the file, or names of items of the  folder
export function getContents(path: string): Promise<string | string[]> {
  return new Promise((resolve, reject) => {
    getFileType(path)
      .then((type) => {
        switch (type) {
          case "FILE":
            resolve(path);
            break;
          case "DIRECTORY":
            fs.promises
              .readdir(path)
              .then((files) => resolve(files))
              .catch(() => reject(new Error("file system error")));
            break;
          case "OTHER":
            resolve(path);
            break;
        }
      })
      .catch(() => reject(new Error("file system error")));
  });
}

getContents("../functional-programming")
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));
getContents("2.async_assignment.ts")
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));
getContents("wrongfile.ts")
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));

// function that gets the size of the file or folder at given path
export function getSize(path: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.promises
      .stat(path)
      .then((stats) => {
        getContents(path)
          .then((result) => {
            //gives file name if it is file or gives string array if it is folder (it helpful when our folder as multiple folder)
            if (Array.isArray(result)) //if it is folder
            {
              if (result.length === 0) {
                resolve(0);
                return;
              }
              let folderSize = 0;
              let i = 0;
              result.forEach((files) => {
                getSize(`${path}/${files}`)
                  .then((fileSize) => {
                    //using recursion passing each file name to get size
                    folderSize += fileSize;
                    i++;
                    if (i === result.length) resolve(folderSize);
                  })
                  .catch((err) => reject(err));
              });
            } else resolve(stats.size);
          })
          .catch((err) => reject(err));
      })
      .catch(() => reject(new Error("file system error")));
  });
}

getSize("../async-programming")
  .then((size) => console.log(`${size / 1024} KB`))
  .catch((error) => console.log(error.message));
getSize("2.async_assignment.ts")
  .then((size) => console.log(`${size / 1024} KB`))
  .catch((error) => console.log(error.message));

getSize("wrongfile.ts")
  .then((size) => console.log(`${size / 1024} KB`))
  .catch((error) => console.log(error.message));
