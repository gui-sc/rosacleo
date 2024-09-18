export default function ShipConfirmModal({ onClose }: { onClose: () => void }) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
                {/* Cabeçalho */}
                <div className="border-b-2 border-[--primary] pb-3 mb-4">
                    <h2 className="text-3xl font-bold text-[--primary] text-center">Compra Confirmada</h2>
                </div>

                {/* Corpo do Modal */}
                <div className="space-y-4 text-center">
                    <p className="text-lg font-semibold text-gray-700">Compra confirmada com sucesso!</p>
                    <p className="text-lg text-gray-700">Obrigado pela preferência!</p>
                    <p className="text-lg text-gray-700">Seu pedido será entregue em breve.</p>
                </div>

                {/* Botão */}
                <button
                    onClick={onClose}
                    className="mt-10 w-full px-4 py-2 bg-[--primary] text-white font-bold rounded-md border-2 border-[--background] transition-all duration-300 hover:bg-[--background] hover:border-[--primary] hover:text-[--primary]"
                >
                    Ok
                </button>
            </div>
        </div>

    );
}
