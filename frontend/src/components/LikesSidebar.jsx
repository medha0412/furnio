import React from 'react';
import { useLikes } from '../contexts/LikesContext';

const LikesSidebar = () => {
  const { isOpen, items, toggleOpen, removeLike, clearLikes } = useLikes();
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleOpen} />
      <div className="fixed left-0 top-0 h-full w-full sm:w-80 bg-white shadow-xl z-50">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Liked Products</h3>
          <div className="flex gap-2">
            {items.length > 0 && (
              <button onClick={clearLikes} className="text-sm text-red-600 hover:underline">Clear</button>
            )}
            <button onClick={toggleOpen} aria-label="Close">✕</button>
          </div>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-56px)]">
          {items.length === 0 ? (
            <div className="text-gray-500 text-sm">No liked products yet.</div>
          ) : (
            items.map((p) => (
              <div key={p.id} className="flex items-center gap-3 border rounded p-2">
                <img src={p.image || p.images?.[0]} alt={p.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium line-clamp-1">{p.name}</div>
                  <div className="text-xs text-gray-500 line-clamp-1">{p.category}</div>
                </div>
                <button onClick={() => removeLike(p.id)} className="text-red-600 text-sm">Remove</button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default LikesSidebar;


