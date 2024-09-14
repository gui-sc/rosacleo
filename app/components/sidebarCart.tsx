import { useState } from 'react';
import LocalMallIcon from '@mui/icons-material/LocalMall'; // Ícone do carrinho
import HiX from '@mui/icons-material/Close'; // Ícone para fechar a sidebar

const ShoppingCartSidebar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Simulação de itens no carrinho
    const cartItems = [
        { id: 1, name: 'Produto 1', price: 19.99 },
        { id: 2, name: 'Produto 2', price: 9.99 },
        { id: 3, name: 'Produto 3', price: 14.99 },
        { id: 1, name: 'Produto 1', price: 19.99 },
        { id: 2, name: 'Produto 2', price: 9.99 },
        { id: 3, name: 'Produto 3', price: 14.99 },
    ];

    // Função para calcular o total do carrinho
    const cartTotal = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

    return (
        <div>
            {/* Botão para abrir o carrinho */}
            <button
                className="text-3xl"
                onClick={() => setIsCartOpen(true)}
            >
                <LocalMallIcon className="text-[--primary]" />
            </button>

            {/* Sidebar do carrinho */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-md p-5 transform ${
                    isCartOpen ? 'translate-x-0' : 'translate-x-full'
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
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center border-b pb-2">
                                <span>{item.name}</span>
                                <span>R$ {item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Total do carrinho */}
                    <div className="mt-4 flex justify-between items-center font-bold">
                        <span>Total:</span>
                        <span>R$ {cartTotal}</span>
                    </div>

                    {/* Botão para finalizar a compra */}
                    <button className="mt-5 w-full px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] transition-all duration-300 ease-in-out">
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartSidebar;
