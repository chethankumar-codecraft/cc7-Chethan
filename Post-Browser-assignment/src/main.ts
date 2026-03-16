import "./style.css";
import { APIService } from "../../async-programming/7.API_service";
import type { Post, Comments } from "../../async-programming/7.API_service.ts";
import { CacheService } from "../CacheService.ts";

const apiService = new APIService();

const postTitle = document.querySelector("#post-title"); //returns null if DOM element is'nt found
console.assert(postTitle !== null, "postTitle element not found in DOM");

const postId = document.querySelector("#post-id");
console.assert(postId !== null, "postId element not found in DOM");

const postBody = document.querySelector("#post-body");
console.assert(postBody !== null, "postBody element not found in DOM");

const commentsList = document.querySelector("#comments-list");
console.assert(commentsList !== null, "commentsList element not found in DOM");

const previousButton = document.querySelector<HTMLButtonElement>("#previous");
console.assert(
  previousButton !== null,
  "previousButton element not found in DOM",
);

const nextButton = document.querySelector("#next");
console.assert(nextButton !== null, "nextButton element not found in DOM");

const refreshButton = document.querySelector("#refresh");
console.assert(
  refreshButton !== null,
  "refreshButton element not found in DOM",
);

const commentsButton = document.querySelector("#comments");
console.assert(
  commentsButton !== null,
  "commentsButton element not found in DOM",
);

const status = document.querySelector("#status");
console.assert(status !== null, "status element not found in DOM");

const commentsSection = document.querySelector(".comments-section");
console.assert(
  commentsSection !== null,
  "commentsSection element not found in DOM",
);

let currentId = 1;

const postCache = new CacheService<Post>();
const commentCache = new CacheService<Comments[]>();

/**
 * Loads a post by ID and updates the DOM with its content.
 * Caches the post to avoid repeated API calls.
 * @param id number
 * @returns {Promise<void>} Resolves when the post has been loaded and DOM updated.
 * @throws Will log an error if fetching the post fails.
 */

async function loadPost(id: number): Promise<void> {
  try {
    status!.textContent = "Loading Post...";
    commentsList!.innerHTML = "";
    commentsSection!.classList.remove("show");
    previousButton!.disabled = id === 1;
    const postKey = `post-${id}`;
    let post = postCache.get(postKey);
    if (!post) {
      post = await apiService.fetchPost(id);
      postCache.set(postKey, post);
    }

    postId!.textContent = `Post Id:#${post.id}`;
    postTitle!.textContent = post.title;

    postBody!.textContent = post.body;
    status!.textContent = "";
    currentId = id;
  } catch (err) {
    status!.textContent = "Loading Post Failed";
    console.error(err);
  }
}

/**
 * Loads comments for the current post and updates the DOM.
 * Shows only the first 5 comments and caches them.
 * takes no parameter
 * @returns {Promise<void>} Resolves when comments are loaded and appended to the DOM.
 * @throws Will log an error if fetching comments fails.
 */

async function loadComment(): Promise<void> {
  try {
    status!.textContent = "Loading comments...";
    commentsList!.innerHTML = "";
    commentsSection!.classList.add("show");
    const commentKey = `comments-${currentId}`;
    let comments = commentCache.get(commentKey);
    if (!comments) {
      comments = await apiService.fetchComments(currentId, 5); //get first 5
      commentCache.set(commentKey, comments);
    }
    comments.forEach((comment) => {
      const newList = document.createElement("li");
      newList.textContent = `${comment.name}:${comment.body}`;
      commentsList?.appendChild(newList);
    });
    status!.textContent = "";
  } catch (err) {
    status!.textContent = "Failed to fetch comments";
    console.error(err);
  }
}
previousButton!.addEventListener("click", () => {
  if (currentId > 0) loadPost(currentId - 1);
});
nextButton!.addEventListener("click", () => {
  loadPost(currentId + 1);
});
refreshButton!.addEventListener("click", () => {
  postCache.delete(`post-${currentId}`);
  commentCache.delete(`comments-${currentId}`);
  loadPost(currentId);
});
commentsButton!.addEventListener("click", () => {
  loadComment();
});
loadPost(1);
