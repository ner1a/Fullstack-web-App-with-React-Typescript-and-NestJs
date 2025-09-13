import { useState } from "react";

import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

import Modal from "./Modal";

type UserCardProps = {
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
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

function UserCard(props: UserCardProps) {
    const [showModal, setShowModal] = useState(false);
    const nameParts = props.name.split(" ");

    return (
        <>
            <article
                aria-labelledby={`user-${props.id}-name`}
                className="flex justify-between flex-col h-[320px] w-[364px] border rounded-lg p-8 lg:basis-32/100 md:basis-49/100 sm:basis-full relative cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-transform"
                role="button"
                tabIndex={0}
                onClick={() => setShowModal(true)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setShowModal(true);
                    }
                }}
            >
                <div>
                    <h3 className="text-center mb-4 mt-4 font-bold text-xl">{props.username}</h3>

                    <div className="mb-1">Name: {props.name}</div>
                    <div className="mb-1">Email: {props.email}</div>
                    <div className="mb-1">Phone: {props.phone}</div>
                    <div className="mb-2">Website: {props.website}</div>
                </div>
                <div className="flex justify-center">
                    <button
                        aria-haspopup="dialog"
                        onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                        title="Show more"
                    >
                        More
                    </button>
                </div>

                <div className="flex flex-row mt-2 mr-2 gap-2 absolute top-0 right-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); props.onEdit?.(props.id); }}
                      className="flex justify-center items-center w-fit h-fit p-[8px]"
                      aria-label="Edit user"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); props.onDelete?.(props.id); }}
                      className="flex justify-center items-center w-fit h-fit p-[8px]"
                      aria-label="Delete user"
                    >
                      <FaTrashCan />
                    </button>
                </div>

            </article>

            <Modal
                isOpen={showModal}
                title={`${nameParts[0] ?? ""} "${props.username}" ${nameParts[1] ?? ""}`}
                onClose={() => setShowModal(false)}
            >
                <div className="space-y-3">
                    <div><strong>Email:</strong> {props.email}</div>
                    <div><strong>Phone:</strong> {props.phone}</div>
                    <div><strong>Website:</strong> {props.website}</div>

                    <section className="pt-2 border-t">
                        <h4 className="font-semibold text-lg">Address</h4>
                        <div><strong>Street:</strong> {props.address?.street}</div>
                        <div><strong>Suite:</strong> {props.address?.suite}</div>
                        <div><strong>City:</strong> {props.address?.city}</div>
                        <div><strong>Zipcode:</strong> {props.address?.zipcode}</div>
                        <div><strong>Geo:</strong> {props.address?.geo?.lat}, {props.address?.geo?.lng}</div>
                    </section>

                    {props.company && (
                        <section className="pt-2 border-t">
                            <h4 className="font-semibold text-lg">Company</h4>
                            {props.company.name && <div><strong>Name:</strong> {props.company.name}</div>}
                            {props.company.catchPhrase && <span><strong>CatchPhrase:</strong> {props.company.catchPhrase}</span>}
                            {props.company.bs && <span><strong>BS:</strong> {props.company.bs}</span>}
                        </section>
                    )}

                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            onClick={() => { props.onEdit?.(props.id); setShowModal(false); }}
                            className="flex justify-center items-center w-fit h-fit p-[8px]"
                        >
                            <FaEdit/>
                        </button>
                        <button
                            onClick={() => { props.onDelete?.(props.id); setShowModal(false); }}
                            className="flex justify-center items-center w-fit h-fit p-[8px]"
                        >
                            <FaTrashCan/>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default UserCard;

