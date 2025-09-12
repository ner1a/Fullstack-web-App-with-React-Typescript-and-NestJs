import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
const { VITE_API_BASE_URL } = import.meta.env;

const API = VITE_API_BASE_URL;

export type User = {
    id: number;
    name: string;
    username: string;
    email?: string;
    address?: {
        street?: string;
        suite?: string;
        city?: string;
        zipcode?: number;
        geo?: {
            lat?: number;
            lng?: number;
        }
    };
    phone?: string;
    website?: string;
    company?: {
        name?: string;
        catchPhrase?: string;
        bs?: string;
    };
};

type UsersState = {
  users: User[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>("users/fetchUsers", async () => {
  const res = await fetch(`${API}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return (await res.json()) as User[];
});

export const createUser = createAsyncThunk<User, Omit<User, "id">>(
  "users/createUser",
  async (payload) => {
    const res = await fetch(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create user");
    return (await res.json()) as User;
  }
);

export const updateUser = createAsyncThunk<User, { id: number; patch: Partial<User> }>(
  "users/updateUser",
  async ({ id, patch }) => {
    const res = await fetch(`${API}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return (await res.json()) as User;
  }
);

export const deleteUser = createAsyncThunk<{ id: number }, number>(
  "users/deleteUser",
  async (id) => {
    const res = await fetch(`${API}/users/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete user");
    return { id };
  }
);

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (s) => { s.isLoading = true; s.error = null; })
      .addCase(fetchUsers.fulfilled, (s, a) => { s.isLoading = false; s.users = a.payload; })
      .addCase(fetchUsers.rejected, (s, a) => { s.isLoading = false; s.error = a.error.message ?? "Error"; })

      .addCase(createUser.fulfilled, (s, a) => { s.users.unshift(a.payload); })
      .addCase(createUser.rejected, (s, a) => { s.error = a.error.message ?? s.error; })

      .addCase(updateUser.fulfilled, (s, a) => {
        const idx = s.users.findIndex((u) => u.id === a.payload.id);
        if (idx !== -1) s.users[idx] = a.payload;
      })
      .addCase(updateUser.rejected, (s, a) => { s.error = a.error.message ?? s.error; })

      .addCase(deleteUser.fulfilled, (s, a) => {
        s.users = s.users.filter((u) => u.id !== a.payload.id);
      })
      .addCase(deleteUser.rejected, (s, a) => { s.error = a.error.message ?? s.error; });
  },
});

export const { setUsers } = slice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.isLoading;

export default slice.reducer;
