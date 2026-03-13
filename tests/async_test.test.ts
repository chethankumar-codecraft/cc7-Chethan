import { it, describe, expect } from "vitest";
import path from "path";
import * as promiseVersion from "../async-programming/1.async_assignment.ts";
import * as promisefsVersion from "../async-programming/2.async_assignment.ts";
import * as asyncAwaitVersion from "../async-programming/3.async_assignment.ts";

//testing Promise Version using resolve/reject pattern
describe("Promise Version Tests", () => {
  describe("Testing getFileType", () => {
    it("file name should return type FILE", () => {
      return expect(
        promiseVersion.getFileType(
          path.resolve("async-programming/1.async_assignment.ts"),
        ),
      ).resolves.toBe("FILE");
    });
    it("folder name should return type DIRECTORY", () => {
      return expect(
        promiseVersion.getFileType(path.resolve("async-programming")),
      ).resolves.toBe("DIRECTORY");
    });
    it("Invalid path should return error message", () => {
      return expect(
        promiseVersion.getFileType(path.resolve("invalid.ts")),
      ).rejects.toThrow("file system error");
    });
  });

  describe("Testing getContent", () => {
    it("file name should return type single file name", () => {
      const filePath = path.resolve("async-programming/1.async_assignment.ts");
      return expect(promiseVersion.getContents(filePath)).resolves.toBe(
        filePath,
      );
    });
    it("folder name should return the files list", () => {
      const folderPath = path.resolve("functional-programming");
      return expect(promiseVersion.getContents(folderPath)).resolves.toEqual([
        "Higher_Order_Function.ts",
        "Higher_Order_Function2.ts",
        "Higher_Order_Function_3.ts",
        "movies.json",
      ]);
    });
    it("Invalid path should return error message", () => {
      return expect(
        promiseVersion.getContents(path.resolve("invalid.ts")),
      ).rejects.toThrow("file system error");
    });
  });

  describe("Testing getSize", () => {
    it("file name should return size of the file", () => {
      const filePath = path.resolve("async-programming/1.async_assignment.ts");
      return expect(promiseVersion.getSize(filePath)).resolves.toBe(4326);
    });
    it("folder name should return the size of the folder", () => {
      const folderPath = path.resolve("functional-programming");
      return expect(promiseVersion.getSize(folderPath)).resolves.toBe(173569);
    });
    it("Invalid path should return error message", () => {
      return expect(
        promiseVersion.getSize(path.resolve("invalid.ts")),
      ).rejects.toThrow("file system error");
    });
  });
});

//Testing Promise fs
describe("Promise-fs Version Tests", () => {
  describe("getFileType", () => {
    it("file should return FILE", () => {
      return expect(
        promisefsVersion.getFileType(
          path.resolve("async-programming/1.async_assignment.ts"),
        ),
      ).resolves.toBe("FILE");
    });

    it("folder should return DIRECTORY", () => {
      return expect(
        promisefsVersion.getFileType(path.resolve("async-programming")),
      ).resolves.toBe("DIRECTORY");
    });

    it("invalid path should throw file system error", () => {
      return expect(
        promisefsVersion.getFileType(path.resolve("invalid.ts")),
      ).rejects.toThrow("file system error");
    });
  });

  describe("getContents", () => {
    it("file should return file path", () => {
      const filePath = path.resolve("async-programming/1.async_assignment.ts");
      return expect(promisefsVersion.getContents(filePath)).resolves.toBe(
        filePath,
      );
    });

    it("folder should return list of files", () => {
      const folderPath = path.resolve("functional-programming");
      return expect(promisefsVersion.getContents(folderPath)).resolves.toEqual([
        "Higher_Order_Function.ts",
        "Higher_Order_Function2.ts",
        "Higher_Order_Function_3.ts",
        "movies.json",
      ]);
    });

    it("invalid path should throw file system error", () => {
      return expect(
        promisefsVersion.getContents(path.resolve("invalid.ts")),
      ).rejects.toThrow("file system error");
    });
  });

  describe("getSize", () => {
    it("file should return correct size", () => {
      const filePath = path.resolve("async-programming/1.async_assignment.ts");
      return expect(promisefsVersion.getSize(filePath)).resolves.toBe(4326); // check actual file size
    });

    it("folder should return total size", () => {
      const folderPath = path.resolve("functional-programming");
      return expect(promisefsVersion.getSize(folderPath)).resolves.toBe(173569); // check actual folder size
    });

    it("invalid path should throw file system error", () => {
      return expect(
        promisefsVersion.getSize(path.resolve("invalid.ts")),
      ).rejects.toThrow("file system error");
    });
  });
});

//Testing sync await using same pattern
describe("Async/Await Version Tests (using async/await)", () => {
  describe("getFileType", () => {
    it("file path should return FILE", async () => {
      const result = await asyncAwaitVersion.getFileType(
        path.resolve("async-programming/1.async_assignment.ts"),
      );
      expect(result).toBe("FILE");
    });

    it("folder path should return DIRECTORY", async () => {
      const result = await asyncAwaitVersion.getFileType(
        path.resolve("async-programming"),
      );
      expect(result).toBe("DIRECTORY");
    });

    it("invalid path should throw file system error", async () => {
      await expect(
        asyncAwaitVersion.getFileType(path.resolve("wrongfile.ts")),
      ).rejects.toThrow("file system error");
    });
  });

  describe("getContents", () => {
    it("file path should return file path", async () => {
      const filePath = path.resolve("async-programming/1.async_assignment.ts");
      const result = await asyncAwaitVersion.getContents(filePath);
      expect(result).toBe(filePath);
    });

    it("folder path should return list of files", async () => {
      const folderPath = path.resolve("functional-programming");
      const result = await asyncAwaitVersion.getContents(folderPath);
      expect(result).toEqual([
        "Higher_Order_Function.ts",
        "Higher_Order_Function2.ts",
        "Higher_Order_Function_3.ts",
        "movies.json",
      ]);
    });

    it("invalid path should throw file system error", async () => {
      await expect(
        asyncAwaitVersion.getContents(path.resolve("wrongfile.ts")),
      ).rejects.toThrow("file system error");
    });
  });

  describe("getSize", () => {
    it("file path should return size", async () => {
      const filePath = path.resolve("async-programming/1.async_assignment.ts");
      const result = await asyncAwaitVersion.getSize(filePath);
      expect(result).toBe(4326); // update with actual file size
    });

    it("folder path should return total size", async () => {
      const folderPath = path.resolve("functional-programming");
      const result = await asyncAwaitVersion.getSize(folderPath);
      expect(result).toBe(173569); // update with actual folder size
    });

    it("invalid path should throw file system error", async () => {
      await expect(
        asyncAwaitVersion.getSize(path.resolve("wrongfile.ts")),
      ).rejects.toThrow("file system error");
    });
  });
});
