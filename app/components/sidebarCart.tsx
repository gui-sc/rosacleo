import { useState } from 'react';
import LocalMallIcon from '@mui/icons-material/LocalMall'; // Ícone do carrinho
import HiX from '@mui/icons-material/Close'; // Ícone para fechar a sidebar
import { useCart } from '../contexts/cartContext';
import { useRouter } from 'next/navigation';
import { formatNumber } from '../helpers/formatNumer';

const ShoppingCartSidebar = () => {
    const router = useRouter();
    const { cartItems, addCartItem, removeCartItem } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Função para calcular o total do carrinho
    const cartTotal = Object.values(cartItems).reduce((acc, item) => {
        return acc + item.item.price * item.quantity;
    }, 0);

    const totalItems = Object.values(cartItems).reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    const handleCheckout = () => {
        router.push('/carrinho');
    }

    return (
        <div>
            {/* Botão para abrir o carrinho */}
            <button
                className="text-2xl md:text-3xl"
                onClick={() => setIsCartOpen(true)}
            >
                <div className="relative w-8 md:w-10">
                    <LocalMallIcon className="text-[--primary]" />
                    {totalItems > 0 && (
                        <span
                            className="absolute top-0 right-0 bg-[--background] text-[--primary] border-[--primary] border-2 text-xs rounded-full w-4 h-4 flex items-center justify-center"
                        >
                            {totalItems}
                        </span>
                    )}
                </div>
            </button>

            {/* Sidebar do carrinho */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-xs md:w-80 bg-white shadow-md p-4 md:p-5 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                {/* Botão para fechar o carrinho */}
                <button
                    className="text-2xl mb-4 md:text-3xl"
                    onClick={() => setIsCartOpen(false)}
                >
                    <HiX />
                </button>

                <h2 className="text-lg font-bold mb-4 md:text-xl">
                    Carrinho de Compras
                </h2>

                {/* Área de conteúdo com rolagem */}
                <div className="h-[calc(100vh-150px)] overflow-y-auto pr-2">
                    {/* Lista de itens do carrinho */}
                    <div className="flex flex-col gap-4">
                        {Object.keys(cartItems).map((key) => (
                            <div key={key} className="flex justify-between items-center border-b pb-2 text-sm md:text-base">
                                <span>{cartItems[key].item.name}</span>
                                <div className="flex items-center gap-2 justify-between">

                                    <button
                                        className="px-2 py-1 bg-[--primary] text-[--background] rounded-full"
                                        onClick={() => removeCartItem(cartItems[key].item)}
                                    >
                                        -
                                    </button>

                                    <span className="text-xs font-semibold">{cartItems[key].quantity}{" "}</span>

                                    {/* Botão de aumentar quantidade */}
                                    <button
                                        className="px-2 py-1 bg-[--primary] text-[--background] rounded-full"
                                        onClick={() => addCartItem(cartItems[key].item)}
                                    >
                                        +
                                    </button>

                                </div>
                                {/* Botão de diminuir quantidade */}
                                <div className='flex flex-row justify-between gap-3'>
                                    <span>R$</span>
                                    <span>{formatNumber(cartItems[key].item.price)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total do carrinho */}
                    {cartTotal === 0 ? (
                        <div className="text-center mt-4 text-sm md:text-base">
                            Seu carrinho está vazio
                        </div>
                    ) : (
                        <>
                            <div className="mt-4 flex justify-between items-center font-bold text-sm md:text-base">
                                <span>Total:</span>
                                <span>R$ {formatNumber(cartTotal)}</span>
                            </div>
                            <button
                                className="w-full px-3 py-1 mt-4 bg-[--primary] text-white text-sm md:text-base rounded-md hover:bg-white hover:text-[--primary] border-2 hover:border-[--primary] border-white transition-all duration-300 ease-in-out"
                                onClick={handleCheckout}
                            >
                                Finalizar Compra
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartSidebar;