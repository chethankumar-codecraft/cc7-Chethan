import fs from "node:fs";
/**
 * 1.Implement the following functions.
 * 
// Returns a promise that when resolved will get you the type of file
// when error, it will come back with an Error with message "file system error"
function getFileType(path: string): Promise<'FILE'|'DIRECTORY'|'OTHER'>

//function that gets you the file path of the file, or names of items of the  folder
function getContents(path: string):Promise<string|string[]>

// function that gets the size of the file or folder at given path
function getSize(path:string):Promise<number>
 

Test them using a console based approach by chaining them and catch methods on the returned promises.  

 */
// Returns a promise that when resolved will get you the type of file
// when error, it will come back with an Error with message "file system error"
export function getFileType(
  path: string,
): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
      if (err) reject(new Error("file system error"));
      else if (stats.isFile()) resolve("FILE");
      else if (stats.isDirectory()) resolve("DIRECTORY");
      else resolve("OTHER");
    });
  });
}

getFileType("../async-programming")
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));
getFileType("1.async_assignment.ts")
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
            fs.readdir(path, (err, files) => {
              if (err) reject(new Error("file system error"));
              else resolve(files);
            });
            break;
          case "OTHER":
            resolve(path);
            break;
        }
      })
      .catch((error) => reject(error));
  });
}

getContents("../functional-programming")
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));
getContents("1.async_assignment.ts")
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));
getContents("wrongfile.ts")
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));

// function that gets the size of the file or folder at given path
export function getSize(path: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
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
    });
  });
}

getSize("../async-programming")
  .then((size) => console.log(`${size / 1024} KB`))
  .catch((error) => console.log(error.message));
getSize("1.async_assignment.ts")
  .then((size) => console.log(`${size / 1024} KB`))
  .catch((error) => console.log(error.message));

getSize("wrongfile.ts")
  .then((size) => console.log(`${size / 1024} KB`))
  .catch((error) => console.log(error.message));
