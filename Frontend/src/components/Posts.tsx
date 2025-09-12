import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  selectAllPosts,
  selectPostsLoading,
  type Post,
} from "../redux/postsSlice";
import { fetchUsers, selectUsers } from "../redux/usersSlice";

import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";
import ConfirmModal from "./ConfirmModal";
import EditPostModal from "./EditPostModal";


function Posts() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const loading = useAppSelector(selectPostsLoading);
  const users = useAppSelector(selectUsers);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Post | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreateClick = () => setShowCreateModal(true);

  const handleCreate = async (payload: { userId: number; title: string; body: string }) => {
    await dispatch(createPost(payload));
    setShowCreateModal(false);
  };

  const handleEditOpen = (id: number) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    setEditTarget({ id: post.id, userId: post.userId, title: post.title, body: post.body });
  };

  const handleUpdate = async (id: number, patch: { userId: number; title: string; body: string }) => {
    await dispatch(updatePost({ id, patch }));
    setEditTarget(null);
  };

  const handleDelete = (id: number, title: string) => {
    setDeleteError(null);
    setDeleteTarget({ id, title });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await dispatch(deletePost(deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setDeleteError(err.message);
        } else {
            setDeleteError(String(err));
        }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main id="main" tabIndex={-1} className="max-w-6xl mx-auto p-4 min-w-[80vh]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div>
          <button onClick={handleCreateClick} className="px-3 py-2 bg-green-600 text-white rounded-full">
            Create Post
          </button>
        </div>
      </div>

      <div aria-live="polite" className="mb-4 flex justify-center">{loading ? <span>Loading posts…</span> : <span>{posts.length} posts</span>}</div>

      <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => {
          const user = users.find((user) => user.id === post.userId);
          const isDeleted = !user;
          const username = isDeleted ? "Deleted user" : (user.username ?? user.name);
          return (
            <li key={post.id} role="listitem">
              <PostCard
                id={post.id}
                title={post.title}
                body={post.body}
                username={username}
                isAuthorDeleted={isDeleted}
                onEdit={handleEditOpen}
                onDelete={(id) => {
                  const p = posts.find((x) => x.id === id);
                  handleDelete(id, p?.title ?? "");
                }}
              />
            </li>
          );
        })}
      </ul>

      <CreatePostModal
        isOpen={showCreateModal}
        users={users}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreate}
      />

      <EditPostModal
        isOpen={!!editTarget}
        post={editTarget ?? undefined}
        users={users}
        onClose={() => setEditTarget(null)}
        onUpdate={handleUpdate}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete post"
        message={deleteTarget ? `Delete post "${deleteTarget.title}"? This action cannot be undone.` : undefined}
        confirmLabel={deleting ? "Deleting…" : "Delete"}
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      {deleteError && <div className="text-sm text-red-600 mt-2" role="alert">{deleteError}</div>}
    </main>
  );
}

export default Posts;