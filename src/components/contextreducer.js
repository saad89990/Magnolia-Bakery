import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";

// Contexts
const CartStateContext = createContext([]);
const CartDispatchContext = createContext(() => {});

// ✅ Load from localStorage
const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existingIndex = state.findIndex(
        (item) =>
          item.id === action.id &&
          item.size === action.size &&
          item.name === action.name
      );

      if (existingIndex !== -1) {
        const updatedState = state.map((item, i) => {
          if (i === existingIndex) {
            return {
              ...item,
              qty: item.qty + action.qty,
              price: item.price + action.price,
            };
          }
          return item;
        });
        return updatedState;
      } else {
        return [
          ...state,
          {
            id: action.id,
            name: action.name,
            qty: action.qty,
            size: action.size,
            price: action.price,
            img: action.img,
          },
        ];
      }
    }

    case "REMOVE": {
      const updatedState = [...state];
      updatedState.splice(action.index, 1);
      return updatedState;
    }

    case "CLEAR":
      return [];

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// ✅ CartProvider
export const CartProvider = ({ children }) => {
  // ✅ Use initialCart here!
  const [state, dispatch] = useReducer(reducer, initialCart);

  // ✅ Save cart to localStorage on every change
  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("sitelogintoken");
    if (isLoggedIn) {
      localStorage.setItem("cart", JSON.stringify(state));
    } else {
      localStorage.removeItem("cart"); // Optional: clear cart if logged out
    }
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Hooks
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
