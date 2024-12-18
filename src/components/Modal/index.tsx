import {ReactNode} from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function Modal({isOpen, onClose, children}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full">
            <div className="bg-white p-4 rounded-lg w-11/12 relative">
                <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
}