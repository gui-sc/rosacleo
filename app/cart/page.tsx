'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Para navegação
import Header from '../components/header';
import { useCart } from '../contexts/cartContext';
import PaymentModal from '../components/paymentModal';

export default function CartPage() {
    const { cartItems } = useCart();
    const [activeTab, setActiveTab] = useState('details'); // Estado para alternar entre as abas
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/fechar o modal
    const [cep, setCep] = useState(''); // Estado para armazenar o CEP
    const [total, setTotal] = useState(0); // Estado para armazenar o total do carrinho
    // Função para calcular o total do carrinho
    const cartTotal = Number(Object.values(cartItems).reduce((acc, item) => {
        return acc + item.item.price * item.quantity;
    }, 0).toFixed(2));
    const totalItems = Object.values(cartItems).reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    useEffect(() => {
        setTotal(cartTotal);
    }, [cartItems]);

    useEffect(() => {
        if (cep.length === 8) setTotal(Number((total + 20).toFixed(2)));
    }, [cep]);


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
                                Itens do Carrinho
                            </button>
                            <button
                                onClick={() => setActiveTab('shipping')}
                                className={`px-4 py-2 ${activeTab === 'shipping' ? 'border-b-2 border-[--primary] text-[--primary]' : ''}`}
                            >
                                Informações de Frete
                            </button>
                            <button
                                onClick={() => setActiveTab('address')}
                                className={`px-4 py-2 ${activeTab === 'address' ? 'border-b-2 border-[--primary] text-[--primary]' : ''}`}
                            >
                                Informações de Endereço
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
                                    <span>R$ {total}</span>
                                </div>
                            </div>
                        ) : (activeTab === 'shipping' ? (
                            <div>
                                {/* Conteúdo da aba de informações de frete */}
                                <h3 className="text-lg font-bold">Opções de Frete</h3>
                                <p>Informe seu CEP para calcular o frete:</p>
                                <input type="text" placeholder="Digite seu CEP"
                                    value={cep}
                                    onChange={(e) => setCep((prev) => {
                                        if (prev.length === 8 && e.target.value.length < 8) {
                                            setTotal(total - 20);
                                        }
                                        return e.target.value;
                                    })}
                                    className="mt-2 p-2 border rounded w-full" />
                                {cep.length == 8 && (
                                    <div className="mt-4">
                                        {/* Opções de frete */}
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <span>Entrega Expressa</span>
                                            <span>R$ 20,00</span>
                                            <span className="text-xs">Entrega em até 2 dias úteis</span>
                                            <button
                                                onClick={() => setTotal(total + 20)}
                                                className="px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] border-2 border-[--background] hover:border-[--primary] transition-all duration-300 ease-in-out"
                                            >
                                                Selecionar
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <span>Entrega Normal</span>
                                            <span>R$ 10,00</span>
                                            <span className="text-xs">Entrega em até 5 dias úteis</span>
                                            <button
                                                onClick={() => setTotal(total + 10)}
                                                className="px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] border-2 border-[--background] hover:border-[--primary] transition-all duration-300 ease-in-out"
                                            >
                                                Selecionar
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* Total do carrinho */}
                                <div className="mt-4 flex justify-between items-center font-bold text-xl">
                                    <span>Total:</span>
                                    <span>R$ {total}</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Conteúdo da aba de informações de endereço */}
                                <h3 className="text-lg font-bold">Informações de Endereço</h3>
                                <div className="mt-4">
                                    <label className="block mb-2">Nome</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Endereço</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Número</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Complemento</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">CEP</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Cidade</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Estado</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                            </div>
                        ))}


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
