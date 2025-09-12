import React, { useEffect, useState } from "react";
import Modal from "./Modal";

type UserOption = {
  id: number;
  name?: string;
  username?: string;
};

type Props = {
  isOpen: boolean;
  users: UserOption[];
  onClose: () => void;
  onCreate: (payload: { userId: number; title: string; body: string }) => Promise<void> | void;
};

export default function CreatePostModal({ isOpen, users, onClose, onCreate }: Props) {
  const [userId, setUserId] = useState<number | "">("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setUserId(users[0]?.id ?? "");
      setTitle("");
      setBody("");
      setError(null);
      const lastId = users.find((u) => u.id === users[users.length-1].id)?.id;
      console.log(lastId);
    }
  }, [isOpen, users]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (!userId) {
      setError("Please select a user.");
      return;
    }
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setSubmitting(true);
    try {
      await onCreate({ userId: Number(userId), title: title.trim(), body: body.trim() });
      setTitle("");
      setBody("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} title="Create Post" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="create-post-error">
        <div>
          <label htmlFor="create-post-user" className="block text-sm font-medium mb-1">Author</label>
          <select
            id="create-post-user"
            value={userId}
            onChange={(e) => setUserId(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border rounded px-2 py-2 bg-black overflow-scroll"
            required
          >
            <option value="">Select user…</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username ?? u.name ?? `User ${u.id}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="create-post-title" className="block text-sm font-medium mb-1">Title</label>
          <input
            id="create-post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-2 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="create-post-body" className="block text-sm font-medium mb-1">Body</label>
          <textarea
            id="create-post-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border rounded px-2 py-2 min-h-[120px]"
          />
        </div>

        {error && <div id="create-post-error" className="text-sm text-red-600" role="alert">{error}</div>}

        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {submitting ? "Creating…" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}