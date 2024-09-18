'use client'
import { useState } from 'react';
import { Product } from '../types/product';
import Image from 'next/image';
import { useCart } from '../contexts/cartContext';
import { showToast } from '../helpers/toast';
import { maskToCurrency } from '../helpers/mask';

const ProductDetails = ({ product }: { product: Product }) => {
    const { addCartItem } = useCart();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);

    const handleAddToCart = () => {
        addCartItem(product);
        showToast('Produto adicionado ao carrinho', 'success');
    }

    return (
        <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-10">
            {/* Seletor de imagens (Responsivo para mobile e desktop) */}
            <div className="flex lg:flex-col gap-3 lg:w-1/4">
                {product.images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        width={80}
                        height={80}
                        alt={`Product image ${index + 1}`}
                        className={`w-20 h-20 object-cover cursor-pointer border ${selectedIndex === index ? 'border-[--primary]' : 'border-transparent'}`}
                        onClick={() => setSelectedIndex(index)}
                    />
                ))}
            </div>

            {/* Imagem principal */}
            <div className="lg:w-1/2">
                <Image src={product.images[selectedIndex]} alt="Product"
                    width={500} height={500} className="w-full h-auto object-cover rounded-md shadow-lg" />
            </div>

            {/* Detalhes do produto (Responsivo para mobile e desktop) */}
            <div className="flex flex-col gap-4 lg:w-1/4">
                {/* Título e descrição */}
                <div>
                    <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                </div>

                {/* Cores disponíveis */}
                <div>
                    <p className="text-lg font-semibold mb-2">Cores disponíveis:</p>
                    <div className="flex gap-2">
                        {product.colors.map((color, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: color,
                                }}
                                className={`w-8 h-8 rounded-full cursor-pointer 
                                     border-2 
                                    ${selectedColor === color ? 'border-red-700' : 'border-transparent'}
                                `}
                                onClick={() => setSelectedColor(color)}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Preço e botão de adicionar ao carrinho */}
                <div className="mt-4">
                    <p className="text-2xl text-[--primary] mb-4">R$ {maskToCurrency(product.price)}</p>
                    <button
                        className="w-full px-4 py-2 border-2 border-[--background] hover:border-[--primary] bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] transition-all duration-300 ease-in-out"
                        onClick={() => handleAddToCart()}
                    >
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
