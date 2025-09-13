import React, { useEffect, useState } from "react";
import Modal from "./Modal";

import { type User } from "../redux/usersSlice";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (user: Omit<User, 'id'>) => Promise<void> | void;
};

function CreateUserModal({ isOpen, onClose, onCreate }: Props) {
  const [userDetails, setUserDetails] = useState<Omit<User, 'id'>>({
    username: "",
    name: "",
    email: "",
    phone: "",
    website: "",
    address: {},
    company: {}
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen,]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (!userDetails.username?.trim()) {
      setError("Username is required.");
      return;
    }
    if (!userDetails.name?.trim()) {
      setError("Name is required.");
      return;
    }
    setSubmitting(true);
    try {
      await onCreate(userDetails);
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
    <Modal isOpen={isOpen} title="Create user" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="create-user-error">
        <div>
          <label htmlFor="create-user-username" className="block text-sm font-medium mb-1">Username</label>
          <input
            id="create-user-username"
            value={userDetails.username}
            onChange={(e) => setUserDetails({...userDetails, username: e.target.value})}
            className="w-full border rounded px-2 h-[32px]"
            required
          />
        </div>

        <div>
          <label htmlFor="create-user-name" className="block text-sm font-medium mb-1">Name</label>
          <textarea
            id="create-user-name"
            value={userDetails.name}
            onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
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
            value={userDetails.email}
            onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
            className="w-full border rounded px-2 h-[32px]"
          />
        </div>

        <div>
          <label htmlFor="create-user-phone" className="block text-sm font-medium mb-1">Phone</label>
          <input
            id="create-user-phone"
            value={userDetails.phone}
            pattern="[0-9]{10}"
            title="Phone number should be 10 digits and contain only numbers."
            onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
            className="w-full border rounded px-2 h-[32px]"
          />
        </div>

        <div>
          <label htmlFor="create-user-website" className="block text-sm font-medium mb-1">Website</label>
          <input
            id="create-user-website"
            type="url"
            value={userDetails.website}
            onChange={(e) => setUserDetails({...userDetails, website: e.target.value})}
            className="w-full border rounded px-2 h-[32px] "
          />
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">Address</h4>
          <label htmlFor="create-user-street" className="block text-sm font-medium mb-1">Street</label>
          <textarea
            id="create-user-street"
            value={userDetails.address?.street}
            onChange={(e) => setUserDetails({...userDetails, address: {...userDetails.address, street: e.target.value}})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-suite" className="block text-sm font-medium mb-1">Suite</label>
          <textarea
            id="create-user-suite"
            value={userDetails.address?.suite}
            onChange={(e) => setUserDetails({...userDetails, address: {...userDetails.address, suite: e.target.value}})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-city" className="block text-sm font-medium mb-1">City</label>
          <textarea
            id="create-user-city"
            value={userDetails.address?.city}
            onChange={(e) => setUserDetails({...userDetails, address: {...userDetails.address, city: e.target.value}})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-zipcode" className="block text-sm font-medium mb-1">Zipcode</label>
          <input
            type="number"
            id="create-user-zipcode"
            value={userDetails.address?.zipcode}
            onChange={(e) => setUserDetails({...userDetails, address: {...userDetails.address, zipcode: Number(e.target.value)}})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-geo-lat" className="block text-sm font-medium mb-1">Geo Lat</label>
          <input
            type="number"
            id="create-user-geo-lat"
            value={userDetails.address?.geo?.lat}
            onChange={(e) => setUserDetails({...userDetails, address: {...userDetails.address, geo: {...userDetails.address?.geo, lat: Number(e.target.value)}}})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-geo-lng" className="block text-sm font-medium mb-1">Geo Lng</label>
          <input
            type="number"
            id="create-user-geo-lng"
            value={userDetails.address?.geo?.lng}
            onChange={(e) => setUserDetails({...userDetails, address: {...userDetails.address, geo: {...userDetails.address?.geo, lng: Number(e.target.value)}}})}
            className="w-full border rounded px-2 h-[32px] "
          />
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">Company</h4>
          <label htmlFor="create-user-company-name" className="block text-sm font-medium mb-1">Name</label>
          <textarea
            id="create-user-company-name"
            value={userDetails.company?.name}
            onChange={(e) => setUserDetails({...userDetails, company: {...userDetails.company, name: e.target.value}})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-company-catchPhrase" className="block text-sm font-medium mb-1">Catch Phrase</label>
          <textarea
            id="create-user-company-catchPhrase"
            value={userDetails.company?.catchPhrase}
            onChange={(e) => setUserDetails({...userDetails, company: {...userDetails.company, catchPhrase: e.target.value}})}
            className="w-full border rounded px-2 h-[32px]  mb-2"
          />
          <label htmlFor="create-user-company-bs" className="block text-sm font-medium mb-1">BS</label>
          <textarea
            id="create-user-company-bs"
            value={userDetails.company?.bs}
            onChange={(e) => setUserDetails({...userDetails, company: {...userDetails.company, bs: e.target.value}})}
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
            {submitting ? "Creating…" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateUserModal;
