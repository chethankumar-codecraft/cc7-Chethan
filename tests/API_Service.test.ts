import { describe, it, expect, vi } from "vitest";
import { APIService } from "../async-programming/7.API_service.ts";

describe("API Service tetsing", () => {
  const apiService = new APIService();
  it("fetchPost should give the post of particular id", async () => {
    const post = {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    };

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => post,
    } as Response);

    await expect(apiService.fetchPost(1)).resolves.toEqual(post);
  });
  it("should throw an error when fetch fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as Response);
    await expect(apiService.fetchPost(3)).rejects.toThrow();
  });

  it("should provide the first n comments of particular id", async () => {
    const comments = [
      {
        postId: 1,
        id: 1,
        name: "Chethan Kumar",
        email: "test@gmail.com",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
      },
      {
        postId: 1,
        id: 2,
        name: "Ramesh",
        email: "test2@gmail.com",
        body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
      },
    ];
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => comments,
    } as Response);
    await expect(apiService.fetchComments(1, 2)).resolves.toEqual(comments);
  });
  it("should throw an error when fetch fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as Response);
    await expect(apiService.fetchComments(1, 1)).rejects.toThrow();
  });
});
