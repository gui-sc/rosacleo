'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '@mui/icons-material/Menu';
import MenuOpen from '@mui/icons-material/Close'; // Ícones para abrir e fechar o menu
import SidebarCart from './sidebarCart'; // Importe o componente sidebarCart
import { useAuth } from '../contexts/authContext';
import UserMenu from './userMenu';
import { useRouter } from 'next/navigation';
const Header = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleLogin = () => {
        router.replace('/login');
    }

    return (
        <header className="flex items-center justify-between px-10 bg-[--background] shadow-md sticky top-0 z-50">
            <Link href="/">
                <Image src="/logo.png" width={110} height={110} alt="logo" />
            </Link>

            <button
                className="text-3xl md:hidden text-[--primary]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <Menu />
            </button>

            <div
                className={`md:hidden items-center flex flex-col fixed top-0 right-0 h-full w-64 bg-[--background] shadow-md p-5 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50 md:relative md:transform-none md:flex md:items-center md:gap-5`}
            >
                <div className='flex justify-around w-full text-3xl mb-5 md:hidden'>
                    <button
                        className="w-full text-3xl mb-5 md:hidden text-[--primary] text-start"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <MenuOpen />
                    </button>
                    <SidebarCart />

                </div>
                {user ? (
                    <div className="flex flex-col items-center gap-5">
                        <p className="text-sm mb-2">Olá, {user.name}</p>
                        <button
                            className="w-full px-3 py-1 bg-[--primary] text-white rounded-md hover:bg-red-500 transition-all duration-300 ease-in-out"
                            onClick={logout}
                        >
                            Sair
                        </button>
                    </div>
                ) : (
                    <button className="md:hidden px-3 py-1 bg-[--primary] text-white rounded-md border-2 hover:bg-[--background] hover:text-[--primary] hover:border-[--primary] transition-all duration-300 ease-in-out"
                        onClick={() => { handleLogin() }}>
                        Login
                    </button>
                )}

            </div>
            <div className="hidden md:flex items-center gap-5">
                {user ? (
                    <UserMenu user={user} onLogout={logout} />
                ) : (
                    <button className="px-3 py-1 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] border-2 border-[--background] hover:border-[--primary] transition-all duration-300 ease-in-out"
                        onClick={() => { handleLogin() }}>
                        Login
                    </button>

                )}

                <SidebarCart />
            </div>

        </header >
    );
};

export default Header;
