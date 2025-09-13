import React, { useEffect, useState } from "react";
import Modal from "./Modal";

import { type User } from "../redux/usersSlice";

type Props = {
  isOpen: boolean;
  user: User | undefined;
  onClose: () => void;
  onUpdate: (id: number, patch: User) => Promise<void> | void;
};

function EditUserModal({ isOpen, user, onClose, onUpdate }: Props) {
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string | "">("");
  const [address, setAddress] = useState<{street?: string, suite?: string, city?: string, zipcode?: number, geo?: {lat?: number, lng?: number}}>({});
  const [phone, setPhone] = useState<string | "">("");
  const [website, setWebsite] = useState<string | "">("");
  const [company, setCompany] = useState<{name?: string, catchPhrase?: string, bs?: string}>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      setId(user.id ?? null);
      setName(user.name ?? "");
      setUsername(user.username ?? "");
      setEmail(user.email ?? "");
      setAddress(user.address ?? {});
      setPhone(user.phone ?? "");
      setWebsite(user.website ?? "");
      setCompany(user.company ?? {});
      setError(null);
    }
  }, [isOpen, user]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (!id) return;
    if (!username?.trim()) {
      setError("Username is required.");
      return;
    }
    if (!name?.trim()) {
      setError("Name is required.");
      return;
    }
    setSubmitting(true);
    try {
      await onUpdate(id, {id: id, name: name.trim(), username: username.trim(), email: email.trim(), address: address, phone: phone.trim(), website: website.trim(), company: company });
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
    <Modal 
      isOpen={isOpen}
      title="Edit user"
      onClose={onClose} 
      styleName="h-[80vh]"
    >
      <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="create-user-error">
        <div>
          <label htmlFor="create-user-username" className="block text-sm font-medium mb-1">Username</label>
          <input
            id="create-user-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-2 h-[32px]"
            required
          />
        </div>

        <div>
          <label htmlFor="create-user-name" className="block text-sm font-medium mb-1">Name</label>
          <textarea
            id="create-user-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-2 h-[32px]"
            required
          />
        </div>

        <div>
          <label htmlFor="create-user-email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            id="create-user-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-2 h-[32px]"
          />
        </div>

        <div>
          <label htmlFor="create-user-phone" className="block text-sm font-medium mb-1">Phone</label>
          <input
            id="create-user-phone"
            value={phone}
            pattern="[0-9]{10}"
            title="Phone number should be 10 digits and contain only numbers."
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-2 h-[32px]"
          />
        </div>

        <div>
          <label htmlFor="create-user-website" className="block text-sm font-medium mb-1">Website</label>
          <input
            id="create-user-website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full border rounded px-2 h-[32px] "
          />
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">Address</h4>
          <label htmlFor="create-user-street" className="block text-sm font-medium mb-1">Street</label>
          <textarea
            id="create-user-street"
            value={address.street}
            onChange={(e) => setAddress({...address, street: e.target.value})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-suite" className="block text-sm font-medium mb-1">Suite</label>
          <textarea
            id="create-user-suite"
            value={address.suite}
            onChange={(e) => setAddress({...address, suite: e.target.value})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-city" className="block text-sm font-medium mb-1">City</label>
          <textarea
            id="create-user-city"
            value={address.city}
            onChange={(e) => setAddress({...address, city: e.target.value})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-zipcode" className="block text-sm font-medium mb-1">Zipcode</label>
          <input
            type="number"
            id="create-user-zipcode"
            value={address.zipcode}
            onChange={(e) => setAddress({...address, zipcode: Number(e.target.value)})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-geo-lat" className="block text-sm font-medium mb-1">Geo Lat</label>
          <input
            type="number"
            id="create-user-geo-lat"
            value={address.geo?.lat}
            onChange={(e) => setAddress({...address, geo: {...address.geo, lat: Number(e.target.value)}})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-geo-lng" className="block text-sm font-medium mb-1">Geo Lng</label>
          <input
            type="number"
            id="create-user-geo-lng"
            value={address.geo?.lng}
            onChange={(e) => setAddress({...address, geo: {...address.geo, lng: Number(e.target.value)}})}
            className="w-full border rounded px-2 h-[32px] "
          />
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">Company</h4>
          <label htmlFor="create-user-company-name" className="block text-sm font-medium mb-1">Name</label>
          <textarea
            id="create-user-company-name"
            value={company.name}
            onChange={(e) => setCompany({...company, name: e.target.value})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-company-catchPhrase" className="block text-sm font-medium mb-1">Catch Phrase</label>
          <textarea
            id="create-user-company-catchPhrase"
            value={company.catchPhrase}
            onChange={(e) => setCompany({...company, catchPhrase: e.target.value})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-company-bs" className="block text-sm font-medium mb-1">BS</label>
          <textarea
            id="create-user-company-bs"
            value={company.bs}
            onChange={(e) => setCompany({...company, bs: e.target.value})}
            className="w-full border rounded px-2 h-[32px] "
          />
        </div>

        {error && <div id="create-user-error" className="text-sm text-red-600" role="alert">{error}</div>}

        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {submitting ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditUserModal;
