import React, { createContext, useContext, useEffect, useReducer } from 'react';

const LikesContext = createContext();

const likesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_LIKE': {
      const exists = state.items.find((p) => p.id === action.payload.id);
      return {
        ...state,
        items: exists
          ? state.items.filter((p) => p.id !== action.payload.id)
          : [...state.items, action.payload],
      };
    }
    case 'REMOVE_LIKE': {
      return { ...state, items: state.items.filter((p) => p.id !== action.payload) };
    }
    case 'CLEAR_LIKES': {
      return { ...state, items: [] };
    }
    case 'TOGGLE_OPEN': {
      return { ...state, isOpen: !state.isOpen };
    }
    case 'CLOSE': {
      return { ...state, isOpen: false };
    }
    default:
      return state;
  }
};

const getInitialState = () => {
  try {
    const saved = localStorage.getItem('likes_state');
    if (saved) return { ...JSON.parse(saved), isOpen: false };
  } catch {}
  return { items: [], isOpen: false };
};

export const LikesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likesReducer, undefined, getInitialState);

  useEffect(() => {
    try { localStorage.setItem('likes_state', JSON.stringify({ items: state.items })); } catch {}
  }, [state.items]);

  const toggleLike = (product) => dispatch({ type: 'TOGGLE_LIKE', payload: product });
  const removeLike = (id) => dispatch({ type: 'REMOVE_LIKE', payload: id });
  const clearLikes = () => dispatch({ type: 'CLEAR_LIKES' });
  const toggleOpen = () => dispatch({ type: 'TOGGLE_OPEN' });
  const close = () => dispatch({ type: 'CLOSE' });
  const getTotalLikes = () => state.items.length;

  const value = { ...state, toggleLike, removeLike, clearLikes, toggleOpen, close, getTotalLikes };
  return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>;
};

export const useLikes = () => {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error('useLikes must be used within a LikesProvider');
  return ctx;
};


