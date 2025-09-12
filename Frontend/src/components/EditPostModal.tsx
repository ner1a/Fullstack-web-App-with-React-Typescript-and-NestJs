import React, { useEffect, useState } from "react";
import Modal from "./Modal";

type UserOption = { id: number; name?: string; username?: string };
type PostPayload = { userId: number; title: string; body: string };

type Props = {
  isOpen: boolean;
  post?: { id: number; userId: number; title: string; body: string };
  users: UserOption[];
  onClose: () => void;
  onUpdate: (id: number, patch: PostPayload) => Promise<void> | void;
};

export default function EditPostModal({ isOpen, post, users, onClose, onUpdate }: Props) {
  const [userId, setUserId] = useState<number | "">("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && post) {
      setUserId(post.userId ?? "");
      setTitle(post.title ?? "");
      setBody(post.body ?? "");
      setError(null);
    }
    if (!isOpen) {
      setUserId("");
      setTitle("");
      setBody("");
      setError(null);
    }
  }, [isOpen, post]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (!post) return;
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
      await onUpdate(post.id, { userId: Number(userId), title: title.trim(), body: body.trim() });
      onClose();
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
    <Modal isOpen={isOpen} title="Edit Post" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="edit-post-error">
        <div>
          <label htmlFor="edit-post-user" className="block text-sm font-medium mb-1">Author</label>
          <select
            id="edit-post-user"
            value={userId}
            onChange={(e) => setUserId(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border rounded bg-black px-2 py-2"
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
          <label htmlFor="edit-post-title" className="block text-sm font-medium mb-1">Title</label>
          <input
            id="edit-post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-2 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="edit-post-body" className="block text-sm font-medium mb-1">Body</label>
          <textarea
            id="edit-post-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border rounded px-2 py-2 min-h-[120px]"
          />
        </div>

        {error && <div id="edit-post-error" className="text-sm text-red-600" role="alert">{error}</div>}

        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
            {submitting ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}