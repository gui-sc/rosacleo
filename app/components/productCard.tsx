import Image from "next/image";
import { Product } from "../types/product";
import { useRouter } from "next/navigation";
import { maskToCurrency } from "../helpers/mask";


export default function ProductCard(product: Product) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/produtos/${product.id}`);
    }
    return (
        <div className="flex flex-col items-center gap-5 p-5 bg-[--background] rounded-md shadow-md justify-end hover:shadow-lg border-2 hover:border-[--primary] 
        transition-all duration-300 ease-in-out"
            onClick={() => { handleClick() }}>
            <Image src={product.images[0]} alt={product.name} className="rounded-md" width={100} height={100} />
            <div className="flex flex-col justify-end">
                <h1 className="text-2xl font-bold text-[--primary]">{product.name}</h1>
                <p>{product.shortDescription}</p>
                <p>R$ {maskToCurrency(product.price)}</p>
            </div>
        </div>
    )
}