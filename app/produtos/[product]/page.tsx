'use client'
import ProductDetails from '../../components/productDetails';
import Header from '../../components/header';
import { Product } from '../../types/product';
import { useRouter } from 'next/navigation';

// Produtos simulados para demonstração
const products: Product[] = [
    {
        id: 1,
        name: 'Tenis',
        description: 'Tênis esportivo confortável e leve para a prática de atividades físicas.',
        price: 199.99,
        images: [
            '/product1.png',
            '/product2.png',
            '/product2.png',
        ],
        colors: ['#000000', '#FFFFFF', '#FF5733']
    },
    {
        id: 2,
        name: 'Camiseta',
        description: 'Camiseta feita de material leve, ideal para o dia a dia.',
        price: 49.99,
        images: [
            '/product2.png',
            '/product2.png',
        ],
        colors: ['#FF5733', '#33FF57', '#3357FF']
    }
];

const ProductPage = ({ params }: { params: { product: string } }
) => {
    // Busca o produto com base no parâmetro da URL
    const product = products.find(product => product.name === params.product);
    // Caso o produto não seja encontrado
    const router = useRouter();
    const handleRedirect = () => {
        router.replace('/')
    }
    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl">Produto não encontrado</h1>
                <button
                    className="w-1/4 md:w-1/12 px-4 py-2 border-2 border-[--background] hover:border-[--primary] bg-[--primary] text-white rounded-md hover:bg-[--background] hover:text-[--primary] transition-all duration-300 ease-in-out"
                    onClick={handleRedirect}
                >
                    Voltar
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <ProductDetails product={product} />
        </div>
    );
};

export default ProductPage;
