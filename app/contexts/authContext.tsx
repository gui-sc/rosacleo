'use client';
import { createContext, useContext, useState } from 'react';
import { User } from '../types/user';
export const AuthContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}>({
    user: null,
    setUser: () => {},
    logout: () => {},
});

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const logout = () => setUser(null);
    return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}