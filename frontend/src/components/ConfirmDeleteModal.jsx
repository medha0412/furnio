import React from 'react';

const ConfirmDeleteModal = ({ open, product, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-2">Delete product</h3>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">Are you sure you want to delete "{product?.name}"?</p>
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button onClick={onCancel} className="w-full sm:w-auto border px-4 py-2 rounded text-sm sm:text-base hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm sm:text-base">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;


