'use client';
import { createContext, useContext, useState } from 'react';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';

export const CartContext = createContext<{
    cartItems: Record<string, CartItem>;
    addCartItem: (item: Product) => void;
    removeCartItem: (item: Product) => void;
    clearCart: () => void;
}>({
    cartItems: {},
    addCartItem: () => { },
    removeCartItem: () => { },
    clearCart: () => { },
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
    const clearCart = () => {
        setCartItems({});
    }
    return <CartContext.Provider value={{ cartItems, addCartItem, removeCartItem, clearCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    return context;
}