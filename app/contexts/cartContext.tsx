'use client';
import { createContext, useContext, useState } from 'react';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';

export const CartContext = createContext<{
    cartItems: Record<string, CartItem>;
    addCartItem: (item: Product) => void;
}>({
    cartItems: {},
    addCartItem: () => { },
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

    return <CartContext.Provider value={{ cartItems, addCartItem }}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    return context;
}