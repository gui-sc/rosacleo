import { useEffect, useRef, useState } from 'react';
import UserIcon from '@mui/icons-material/AccountCircle';
import { User } from '../types/user';
const UserMenu = ({ user, onLogout }:
    { user: User; onLogout: () => void }
) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Fecha o menu se clicar fora dele
    useEffect(() => {
        
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* Ícone do usuário */}
            <div
                className="text-[--primary] text-3xl cursor-pointer"
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                <UserIcon />
            </div>

            {/* Menu suspenso */}
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg p-3">
                    <p className="text-sm mb-2">Olá, {user.name}</p>
                    <button
                        className="w-full px-3 py-1 bg-[--primary] text-white rounded-md hover:bg-red-500 transition-all duration-300 ease-in-out"
                        onClick={onLogout}
                    >
                        Sair
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
