'use client';
import { createContext, useContext, useState } from 'react';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';

export const CartContext = createContext<{
    cartItems: Record<string, CartItem>;
    addCartItem: (item: Product) => void;
    removeCartItem: (item: Product) => void;
}>({
    cartItems: {},
    addCartItem: () => { },
    removeCartItem: () => { },
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<Record<string, CartItem>>({});
    const addCartItem = (item: Product) => {
        setCartItems((prev) => {
            const existingItem = prev[item.id];
            if (existingItem) {
                return {
                    ...prev,
                    [item.id]: {
                        item,
                        quantity: existingItem.quantity + 1,
                    },
                };
            }
            return {
                ...prev,
                [item.id]: {
                    item,
                    quantity: 1,
                },
            };
        })
    }
    const removeCartItem = (item: Product) => {
        setCartItems((prev) => {
            const existingItem = prev[item.id];
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    const newCartItems = { ...prev };
                    delete newCartItems[item.id];
                    return newCartItems;
                }
                return {
                    ...prev,
                    [item.id]: {
                        item,
                        quantity: existingItem.quantity - 1,
                    },
                };
            }
            return {
                ...prev,
                [item.id]: {
                    item,
                    quantity: 1,
                },
            };
        })
    }

    return <CartContext.Provider value={{ cartItems, addCartItem, removeCartItem }}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    return context;
}