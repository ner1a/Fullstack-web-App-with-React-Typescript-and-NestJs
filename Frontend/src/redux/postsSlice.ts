import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
const { VITE_API_BASE_URL } = import.meta.env;

const API = VITE_API_BASE_URL;

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type PostsState = {
  posts: Post[];
  isLoading: boolean;
  error?: string | null;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>("posts/fetchPosts", async () => {
  const res = await fetch(`${API}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return (await res.json()) as Post[];
});

export const createPost = createAsyncThunk<Post, Omit<Post, "id">>(
  "posts/createPost",
  async (payload) => {
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create post");
    return (await res.json()) as Post;
  }
);

export const updatePost = createAsyncThunk<Post, { id: number; patch: Partial<Post> }>(
  "posts/updatePost",
  async ({ id, patch }) => {
    const res = await fetch(`${API}/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error("Failed to update post");
    return (await res.json()) as Post;
  }
);

export const deletePost = createAsyncThunk<{ id: number }, number>(
  "posts/deletePost",
  async (id) => {
    const res = await fetch(`${API}/posts/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete post");
    return { id };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {    
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (s) => { s.isLoading = true; s.error = null; })
      .addCase(fetchPosts.fulfilled, (s, a) => { s.isLoading = false; s.posts = a.payload; })
      .addCase(fetchPosts.rejected, (s, a) => { s.isLoading = false; s.error = a.error.message ?? "Error"; })

      .addCase(createPost.fulfilled, (s, a) => { s.posts.unshift(a.payload); })
      .addCase(createPost.rejected, (s, a) => { s.error = a.error.message ?? s.error; })

      .addCase(updatePost.fulfilled, (s, a) => {
        const idx = s.posts.findIndex((p) => p.id === a.payload.id);
        if (idx !== -1) s.posts[idx] = a.payload;
      })
      .addCase(updatePost.rejected, (s, a) => { s.error = a.error.message ?? s.error; })

      .addCase(deletePost.fulfilled, (s, a) => {
        s.posts = s.posts.filter((p) => p.id !== a.payload.id);
      })
      .addCase(deletePost.rejected, (s, a) => { s.error = a.error.message ?? s.error; });
  },
});

export const { setPosts } = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostsLoading = (state: RootState) => state.posts.isLoading;

export default postsSlice.reducer;