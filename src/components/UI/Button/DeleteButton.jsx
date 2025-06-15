"use client";

import { RiDeleteBin5Fill } from "react-icons/ri";

const DeleteButton = () => {
    return (
        <button className="btn btn-xs btn-error text-white">
            <RiDeleteBin5Fill size={15} />
        </button>
    );
};

export default DeleteButton;