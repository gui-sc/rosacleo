'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Para navegação
import Header from '../components/header';
import { useCart } from '../contexts/cartContext';
import PaymentModal from '../components/paymentModal';
import { formatNumber } from '../helpers/formatNumer';
import { Address } from '../types/address';
import { PaymentCard } from '../types/payment';
import ShipConfirmModal from '../components/shipConfirmModal';
import { showToast } from '../helpers/toast';

export default function CartPage() {
    const { cartItems } = useCart();
    const [activeTab, setActiveTab] = useState('details'); // Estado para alternar entre as abas
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/fechar o modal
    const [isModalShipConfirmOpen, setIsModalShipConfirmOpen] = useState(false); // Estado para abrir/fechar o modal de confirmação de frete
    const [cep, setCep] = useState(''); // Estado para armazenar o CEP
    const [total, setTotal] = useState(0); // Estado para armazenar o total do carrinho
    const [shipping, setShipping] = useState(0); // Estado para armazenar o valor do frete
    const [paymentCart, setPaymentCart] = useState<PaymentCard | null>(null); // Estado para armazenar os dados do cartão
    const [address, setAddress] = useState<Address>({
        name: '',
        address: '',
        number: '',
        complement: '',
        cep: '',
        city: '',
        state: '',
    }); // Estado para armazenar os dados do endereço
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

    const handleCheckout = (openModal: (condition: boolean) => void) => {
        if (!validateCep()) return;
        if (!validateAddress()) return;
        openModal(true)
    }

    const validateCep = () => {
        if (cep.length !== 8) {
            showToast('Informe um CEP válido para calcular o frete', 'error');
            setActiveTab('shipping');
            return false;
        }
        if(shipping === 0) {
            showToast('Selecione uma opção de frete', 'error');
            setActiveTab('shipping');
            return false;
        }
        return true;
    }

    const validateAddress = () => {
        const { name, address: street, number, cep, city, state } = address;
        if (!name || !street || !number || !cep || !city || !state) {
            showToast('Preencha todos os campos do endereço', 'error');
            setActiveTab('address');
            return false;
        }
        return true
    }

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
                                    <span>R$ {formatNumber(total + shipping)}</span>
                                </div>
                            </div>
                        ) : (activeTab === 'shipping' ? (
                            <div>
                                {/* Conteúdo da aba de informações de frete */}
                                <h3 className="text-lg font-bold">Opções de Frete</h3>
                                <p>Informe seu CEP para calcular o frete:</p>
                                <input type="text" placeholder="Digite seu CEP"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                    className="mt-2 p-2 border rounded w-full" />
                                {cep.length == 8 && (
                                    <div className="mt-4">
                                        {/* Estilização personalizada para radio buttons */}
                                        <div className="flex items-center justify-between border-b pb-2">
                                            {/* Custom radio button */}
                                            <input
                                                type="radio"
                                                id="expressa"
                                                name="tipoEntrega"
                                                value="expressa"
                                                className="hidden peer"
                                                onChange={() => setShipping(20)}
                                            />
                                            <span className="w-4 h-4 inline-block border-2 border-[--primary] rounded-full mr-2 peer-checked:bg-[--primary] peer-checked:border-[--primary]"></span>
                                            <label htmlFor="expressa" className="flex-1 flex justify-between cursor-pointer">
                                                <span className="text-sm md:text-base">Entrega Expressa</span>
                                                <span className="text-sm md:text-base">R$ 20,00</span>
                                                <span className="text-xs">Até 2 dias úteis</span>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between border-b pb-2">
                                            {/* Custom radio button */}
                                            <input
                                                type="radio"
                                                id="normal"
                                                name="tipoEntrega"
                                                value="normal"
                                                onChange={() => setShipping(10)}
                                                className="hidden peer"
                                            />
                                            <span className="w-4 h-4 inline-block border-2 border-[--primary] rounded-full mr-2 peer-checked:bg-[--primary] peer-checked:border-[--primary]"></span>
                                            <label htmlFor="normal" className="flex-1 flex justify-between cursor-pointer">
                                                <span className="text-sm md:text-base">Entrega Normal</span>
                                                <span className="text-sm md:text-base">R$ 10,00</span>
                                                <span className="text-xs">Até 5 dias úteis</span>
                                            </label>
                                        </div>
                                    </div>

                                )}
                                {/* Total do carrinho */}
                                <div className="mt-4 flex justify-between items-center font-bold text-xl">
                                    <span>Total:</span>
                                    <span>R$ {formatNumber(total + shipping)}</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Conteúdo da aba de informações de endereço */}
                                <h3 className="text-lg font-bold">Informações de Endereço</h3>
                                <div className="mt-4">
                                    <label className="block mb-2">Nome</label>
                                    <input type="text" className="w-full p-2 border rounded" value={address.name}
                                        onChange={(e) => setAddress({ ...address, name: e.target.value })} />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Endereço</label>
                                    <input type="text" className="w-full p-2 border rounded" value={address.address}
                                        onChange={(e) => setAddress({ ...address, address: e.target.value })} />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Número</label>
                                    <input type="text" className="w-full p-2 border rounded" value={address.number}
                                        onChange={(e) => setAddress({ ...address, number: e.target.value })} />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Complemento</label>
                                    <input type="text" className="w-full p-2 border rounded" value={address.complement}
                                        onChange={(e) => setAddress({ ...address, complement: e.target.value })} />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">CEP</label>
                                    <input type="text" className="w-full p-2 border rounded" value={address.cep}
                                        onChange={(e) => setAddress({ ...address, cep: e.target.value })} />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Cidade</label>
                                    <input type="text" className="w-full p-2 border rounded" value={address.city}
                                        onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Estado</label>
                                    <input type="text" className="w-full p-2 border rounded" value={address.state}
                                        onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                                </div>
                            </div>
                        ))}


                        {/* Botão para finalizar a compra */}
                        {!paymentCart ? <button
                            onClick={() => handleCheckout(setIsModalOpen)}
                            className="mt-5 w-full px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] border-2 border-[--background] hover:border-[--primary] transition-all duration-300 ease-in-out"
                        >
                            Ir para o Pagamento
                        </button> :
                            <button
                                onClick={() => handleCheckout(setIsModalShipConfirmOpen)}
                                className="mt-5 w-full px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] border-2 border-[--background] hover:border-[--primary] transition-all duration-300 ease-in-out"
                            >
                                Finalizar Compra
                            </button>}
                    </div>
                )}
            </main>

            {/* Modal para cadastro de cartão */}
            {isModalOpen && <PaymentModal onClose={(cart: PaymentCard | null) => {
                setPaymentCart(cart)
                setIsModalOpen(false)
            }} />}
            {/* Modal de confirmação de compra */}
            {isModalShipConfirmOpen && <ShipConfirmModal onClose={() => setIsModalShipConfirmOpen(false)} />}
        </div>
    );
}
