'use client'
import { FormEvent, useState } from 'react';

export default function PaymentModal({ onClose }: { onClose: () => void }) {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose();
    };

    const maskToDate = (value: string) => {
        const date = value.replace(/\D/g, '').slice(0, 4);
        if (date.length > 2) {
            return `${date.slice(0, 2)}/${date.slice(2)}`;
        }
        return date;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Cadastro de Cartão</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Número do Cartão</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Data de Validade</label>
                        <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => {
                                setExpiryDate(maskToDate(e.target.value));
                            }}
                            className="w-full p-2 border rounded"
                            placeholder="MM/AA"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">CVV</label>
                        <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] border-2 border-[--background] hover:border-[--primary] transition-all duration-300 ease-in-out"
                    >
                        Cadastrar Cartão
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 w-full px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
