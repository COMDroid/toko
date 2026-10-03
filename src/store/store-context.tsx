"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem, WishlistItem } from "@/types";

/* ─────────────────── State ─────────────────── */

interface StoreState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  cartOpen: boolean;
}

const initialState: StoreState = {
  cart: [],
  wishlist: [],
  cartOpen: false,
};

/* ─────────────────── Actions ─────────────────── */

type StoreAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: { productId: string; color: string; size: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; color: string; size: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART"; payload?: boolean }
  | { type: "TOGGLE_WISHLIST"; payload: string }
  | { type: "HYDRATE"; payload: Partial<StoreState> };

/* ─────────────────── Reducer ─────────────────── */

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.color === action.payload.color &&
          i.size === action.payload.size
      );
      if (existing) {
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.map((i) =>
            i.productId === existing.productId &&
            i.color === existing.color &&
            i.size === existing.size
              ? { ...i, quantity: Math.min(i.quantity + action.payload.quantity, 10) }
              : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload], cartOpen: true };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (i) =>
            !(
              i.productId === action.payload.productId &&
              i.color === action.payload.color &&
              i.size === action.payload.size
            )
        ),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.productId === action.payload.productId &&
          i.color === action.payload.color &&
          i.size === action.payload.size
            ? { ...i, quantity: Math.max(1, Math.min(action.payload.quantity, 10)) }
            : i
        ),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "TOGGLE_CART":
      return {
        ...state,
        cartOpen: action.payload !== undefined ? action.payload : !state.cartOpen,
      };

    case "TOGGLE_WISHLIST": {
      const id = action.payload;
      return {
        ...state,
        wishlist: state.wishlist.includes(id)
          ? state.wishlist.filter((w) => w !== id)
          : [...state.wishlist, id],
      };
    }

    case "HYDRATE":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

/* ─────────────────── Context ─────────────────── */

interface StoreContextValue extends StoreState {
  dispatch: React.Dispatch<StoreAction>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, qty: number) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

/* ─────────────────── Provider ─────────────────── */

const STORAGE_KEY = "toko-fits-store";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({
          type: "HYDRATE",
          payload: { cart: parsed.cart || [], wishlist: parsed.wishlist || [] },
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cart: state.cart, wishlist: state.wishlist })
      );
    } catch {
      // ignore
    }
  }, [state.cart, state.wishlist]);

  const addToCart = useCallback(
    (item: CartItem) => dispatch({ type: "ADD_TO_CART", payload: item }),
    []
  );
  const removeFromCart = useCallback(
    (productId: string, color: string, size: string) =>
      dispatch({ type: "REMOVE_FROM_CART", payload: { productId, color, size } }),
    []
  );
  const updateQuantity = useCallback(
    (productId: string, color: string, size: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, color, size, quantity } }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const toggleCart = useCallback(
    (open?: boolean) => dispatch({ type: "TOGGLE_CART", payload: open }),
    []
  );
  const toggleWishlist = useCallback(
    (productId: string) => dispatch({ type: "TOGGLE_WISHLIST", payload: productId }),
    []
  );
  const isInWishlist = useCallback(
    (productId: string) => state.wishlist.includes(productId),
    [state.wishlist]
  );

  const cartCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

/* ─────────────────── Hook ─────────────────── */

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
