'use client'
import Header from "./components/header";
import ProductCard from "./components/productCard";
import { products } from "./helpers/products";

export default function Home() {
  
  return (
    <div >
      <Header />
      <div className="grid gap-5 p-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">

        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}

      </div>
    </div>
  );
}
