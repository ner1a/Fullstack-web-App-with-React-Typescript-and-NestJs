import { useState } from "react";

import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

import Modal from "./Modal";

type PostCardProps = {
  id: number;
  username: string;
  title: string;
  body: string;
  isAuthorDeleted?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

function PostCard(props: PostCardProps) {
  const [open, setOpen] = useState(false);
  const modalId = `post-${props.id}-modal`;

  return (
    <>
      <article
        aria-labelledby={`post-${props.id}-title`}
        className="flex flex-col h-[320px] border rounded-lg p-8 lg:basis-32/100 md:basis-49/100 sm:basis-full relative cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-transform"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >

        <h3 
          id={`post-${props.id}-title`}
          className="text-center h-[55px] mt-4 mb-4 font-bold text-xl line-clamp-2">
          {props.title}
        </h3>

        <p className="mt-2 text-sm line-clamp-4 h-[78px]">{props.body}</p>

        <div className="mt-3 text-right">
          {props.isAuthorDeleted ? (
            <em className="text-md text-gray-500 italic">Deleted user</em>
          ) : (
            <span className="text-md text-gray-400 italic">{props.username}</span>
          )}
        </div>

        <div className="flex flex-row mt-2 mr-2 gap-2 absolute top-0 right-0">
          <button
            onClick={(e) => { e.stopPropagation(); props.onEdit?.(props.id); }}
            className="flex justify-center items-center w-fit h-fit p-[8px]"
            aria-label={`Edit post ${props.title}`}
          >
            <FaEdit />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); props.onDelete?.(props.id); }}
            className="flex justify-center items-center w-fit h-fit p-[8px]"
            aria-label={`Delete post ${props.title}`} 
          >
            <FaTrashCan />
          </button>
        </div>

        <div className="mt-3 flex justify-center">
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(true); }}
            aria-expanded={open}
            aria-controls={modalId}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            More
          </button>
        </div>
      </article>

      <Modal isOpen={open} title={props.title} onClose={() => setOpen(false)}>
        <div>
          <div className="mb-3"><strong>Author:</strong> {props.isAuthorDeleted ? <em>Deleted user</em> : props.username}</div>
          <p>{props.body}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => { props.onEdit?.(props.id); setOpen(false); }} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
            <button onClick={() => { props.onDelete?.(props.id); setOpen(false); }} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PostCard;
