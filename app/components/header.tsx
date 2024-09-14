'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '@mui/icons-material/Menu';
import MenuOpen from '@mui/icons-material/Close'; // Ícones para abrir e fechar o menu
import SidebarCart from './sidebarCart'; // Importe o componente sidebarCart
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="flex items-center justify-between px-10 bg-[--background] shadow-md sticky top-0 z-50">
            <Link href="/">
                <Image src="/logo.png" width={110} height={110} alt="logo" />
            </Link>

            {/* Botão para abrir o menu em telas menores */}
            <button
                className="text-3xl md:hidden text-[--primary]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <Menu />
            </button>


            {/* Menu lateral em telas menores e menu padrão em telas maiores */}

            <div
                className={`md:hidden items-center flex flex-col fixed top-0 right-0 h-full w-64 bg-[--background] shadow-md p-5 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50 md:relative md:transform-none md:flex md:items-center md:gap-5`}
            >
                {/* Fechar menu em telas menores */}
                <button
                    className="w-full text-3xl mb-5 md:hidden text-[--primary] text-start"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <MenuOpen />
                </button>

                <button className="md:hidden px-3 py-1 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] hover:border-[--primary] transition-all duration-300 ease-in-out">
                    Login
                </button>

                <SidebarCart />
            </div>
            <div className="hidden md:flex items-center gap-5">
                <button className="px-3 py-1 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] hover:border-[--primary] transition-all duration-300 ease-in-out">
                    Login
                </button>

                <SidebarCart />
            </div>


            {/* Menu padrão em telas maiores */}

        </header>
    );
};

export default Header;
