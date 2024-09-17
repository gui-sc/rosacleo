'use client'
import { useState } from 'react';
import Link from 'next/link'; // Para navegação
import Header from '../components/header';
import { useCart } from '../contexts/cartContext';
import PaymentModal from '../components/paymentModal';

export default function CartPage() {
    const { cartItems } = useCart();
    const [activeTab, setActiveTab] = useState('details'); // Estado para alternar entre as abas
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/fechar o modal

    // Função para calcular o total do carrinho
    const cartTotal = Object.values(cartItems).reduce((acc, item) => {
        return acc + item.item.price * item.quantity;
    }, 0);
    const totalItems = Object.values(cartItems).reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Cabeçalho */}
            <Header />

            {/* Corpo da Página */}
            <main className="flex-grow p-4">
                {totalItems === 0 ? (
                    <div className="text-center mt-10">
                        <h2 className="text-2xl font-semibold">Seu carrinho está vazio</h2>
                        <p className="mt-4">Volte para a loja e adicione itens ao seu carrinho.</p>
                        <Link href="/" className="mt-5 inline-block px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] border-2 border-[--background] hover:border-[--primary] transition-all duration-300 ease-in-out">
                            Voltar para a loja
                        </Link>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
                        {/* Abas para alternar entre Detalhes do Produto e Informações de Frete */}
                        <div className="flex mb-4 border-b">
                            <button
                                onClick={() => setActiveTab('details')}
                                className={`px-4 py-2 ${activeTab === 'details' ? 'border-b-2 border-[--primary] text-[--primary]' : ''}`}
                            >
                                Detalhes do Produto
                            </button>
                            <button
                                onClick={() => setActiveTab('shipping')}
                                className={`px-4 py-2 ${activeTab === 'shipping' ? 'border-b-2 border-[--primary] text-[--primary]' : ''}`}
                            >
                                Informações de Frete
                            </button>
                        </div>

                        {/* Conteúdo da aba */}
                        {activeTab === 'details' ? (
                            <div className="flex flex-col gap-4">
                                {Object.keys(cartItems).map((key) => (
                                    <div key={key} className="flex justify-between items-center border-b pb-2">
                                        <span>{cartItems[key].item.name}</span>
                                        <div>
                                            <span className='text-xs font-semibold'>{cartItems[key].quantity}x{" "}</span>
                                            <span>R$ {cartItems[key].item.price}</span>
                                        </div>
                                    </div>
                                ))}
                                {/* Total do carrinho */}
                                <div className="mt-4 flex justify-between items-center font-bold text-xl">
                                    <span>Total:</span>
                                    <span>R$ {cartTotal}</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Conteúdo da aba de informações de frete */}
                                <h3 className="text-lg font-bold">Opções de Frete</h3>
                                <p>Informe seu CEP para calcular o frete:</p>
                                <input type="text" placeholder="Digite seu CEP" className="mt-2 p-2 border rounded w-full" />
                                {/* Outras informações e opções de frete */}
                            </div>
                        )}

                        {/* Botão para finalizar a compra */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-5 w-full px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] border-2 border-[--background] hover:border-[--primary] transition-all duration-300 ease-in-out"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                )}
            </main>

            {/* Modal para cadastro de cartão */}
            {isModalOpen && <PaymentModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}
