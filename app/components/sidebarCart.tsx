import { useState } from 'react';
import LocalMallIcon from '@mui/icons-material/LocalMall'; // Ícone do carrinho
import HiX from '@mui/icons-material/Close'; // Ícone para fechar a sidebar
import { useCart } from '../contexts/cartContext';

const ShoppingCartSidebar = () => {
    const { cartItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);


    // Função para calcular o total do carrinho
    const cartTotal = Object.values(cartItems).reduce((acc, item) => {
        return acc + item.item.price * item.quantity;
    }, 0);
    const totalItems = Object.values(cartItems).reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    return (
        <div>
            {/* Botão para abrir o carrinho */}
            <button
                className="text-3xl"
                onClick={() => setIsCartOpen(true)}
            >
                <div className='relative w-10'
                >
                <LocalMallIcon className="text-[--primary]" />
                {totalItems > 0 && (
                    <span
                        className="absolute top-0 right-0 bg-[--background] text-[--primary] border-[--primary] border-2 text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                        {totalItems}
                    </span>
                )}

                </div>
            </button>

            {/* Sidebar do carrinho */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-md p-5 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                {/* Botão para fechar o carrinho */}
                <button
                    className="text-3xl mb-5"
                    onClick={() => setIsCartOpen(false)}
                >
                    <HiX />
                </button>

                <h2 className="text-xl font-bold mb-4">Carrinho de Compras</h2>

                {/* Área de conteúdo com rolagem */}
                <div className="h-[calc(100vh-150px)] overflow-y-auto pr-2">
                    {/* Lista de itens do carrinho */}
                    <div className="flex flex-col gap-4">
                        {Object.keys(cartItems).map((key) => (
                            <div key={key} className="flex justify-between items-center border-b pb-2">
                                <span>{cartItems[key].item.name}</span>
                                <span>{cartItems[key].quantity}x</span>
                                <span>R$ {cartItems[key].item.price}</span>
                            </div>
                        ))}
                    </div>

                    {/* Total do carrinho */}
                    <div className="mt-4 flex justify-between items-center font-bold">
                        <span>Total:</span>
                        <span>R$ {cartTotal}</span>
                    </div>

                    {/* Botão para finalizar a compra */}
                    <button className="mt-5 w-full px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] border-2 border-[--background] hover:border-[--primary] transition-all duration-300 ease-in-out">
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartSidebar;
