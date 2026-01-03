import React from 'react';
import { X } from 'lucide-react';

/**
 * Modal Component
 * Generic modal wrapper.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Is modal visible
 * @param {Function} props.onClose - Close handler
 * @param {string} props.title - Modal title
 * @param {ReactNode} props.children - Modal content
 */
export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="title-font text-lg font-semibold text-slate-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
