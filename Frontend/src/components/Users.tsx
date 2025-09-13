import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  selectUsers,
  selectUsersLoading,
  type User,
} from "../redux/usersSlice";

import ConfirmModal from "./ConfirmModal";
import CreateUserModal from "./CreateUserModal";
import UserCard from "./UserCard";
import EditUserModal from "./EditUserModal";

function Users() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const loading = useAppSelector(selectUsersLoading);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{id: number, username: string} | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateClick = () => setShowCreateModal(true);

  const handleCreate = async (payload: Omit<User, 'id'>) => {
    await dispatch(createUser(payload));
    setShowCreateModal(false);
  };

   const handleEditOpen = async (id: number) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    setEditTarget({ name: user.name, username: user.username, email: user.email, address: user.address, phone: user.phone, website: user.website, company: user.company, id: user.id });
  };

   const handleUpdate = async (id: number, patch: User) => {
    await dispatch(updateUser({ id, patch }));
    setEditTarget(null);
  };

  const handleDelete = async (id: number, username: string) => {
    setDeleteError(null);
    setDeleteTarget({id, username});
  };

  const confirmDelete = async () => {
      if (!deleteTarget) return;
      setDeleting(true);
      setDeleteError(null);
      try {
        await dispatch(deleteUser(deleteTarget.id));
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
    <main id="main" tabIndex={-1} className="max-w-6xl mx-auto p-4 w-[80vw]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <div>
          <button
            onClick={handleCreateClick}
            className="px-3 py-2 bg-green-600 text-white rounded-full">
            Create User
          </button>
        </div>
      </div>

      <div aria-live="polite" className="mb-4 flex justify-center">
        {loading ? (
          <span>Loading users…</span>
        ) : (
          <span>{users.length} users</span>
        )}
      </div>

      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <li key={u.id} role="listitem">
            <UserCard
              id={u.id}
              name={u.name}
              username={u.username}
              email={u.email}
              address={{
                street: u.address?.street ?? "",
                suite: u.address?.suite ?? "",
                city: u.address?.city ?? "",
                zipcode: u.address?.zipcode ?? undefined,
                geo: {
                  lat: u.address?.geo?.lat ?? undefined,
                  lng: u.address?.geo?.lng ?? undefined,
                },
              }}
              phone={u.phone ?? ""}
              website={u.website ?? ""}
              company={u.company ?? undefined}
              onEdit={handleEditOpen}
              onDelete={(id) => {
                  const u = users.find((x) => x.id === id);
                  handleDelete(id, u?.username ?? "");
                }}
            />
          </li>
        ))}
      </ul>

      <EditUserModal
        isOpen={!!editTarget}
        user={editTarget ?? undefined}
        onClose={() => setEditTarget(null)}
        onUpdate={handleUpdate}
      />

      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreate}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete user"
        message={deleteTarget ? `Delete user "${deleteTarget.username}"? This action cannot be undone.` : undefined}
        confirmLabel={deleting ? "Deleting…" : "Delete"}
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      {deleteError && <div className="text-sm text-red-600 mt-2" role="alert">{deleteError}</div>}
    </main>
  );
}

export default Users;
