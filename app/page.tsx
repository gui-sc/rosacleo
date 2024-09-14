'use client'
import Header from "./components/header";
import ProductCard from "./components/productCard";
import { Product } from "./types/product";

export default function Home() {
  
  const products: Product[] = [
    {
      id: 1,
      name: "Tenis",
      price: 100,
      images: ["/product1.png"],
      description: "This is the description of the product 1",
      colors: ["#000", "#fff"],
    },
    {
      id: 2,
      name: "Camiseta",
      price: 200,
      images: ["/product2.png"],
      description: "This is the description of the product 2",
      colors: ["#000", "#fff"],
    },
    {
      id: 1,
      name: "Product 1",
      price: 100,
      images: ["/product1.png"],
      description: "This is the description of the product 1",
      colors: ["#000", "#fff"],
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      images: ["/product2.png"],
      description: "This is the description of the product 2",
      colors: ["#000", "#fff"],
    },
    {
      id: 3,
      name: "Product 3",
      price: 100,
      images: ["/product1.png"],
      description: "This is the description of the product 1",
      colors: ["#000", "#fff"],
    },
    {
      id: 4,
      name: "Product 4",
      price: 200,
      images: ["/product2.png"],
      description: "This is the description of the product 2",
      colors: ["#000", "#fff"],
    },
    {
      id: 5,
      name: "Product 5",
      price: 100,
      images: ["/product1.png"],
      description: "This is the description of the product 1",
      colors: ["#000", "#fff"],
    },
    {
      id: 6,
      name: "Product 6",
      price: 200,
      images: ["/product2.png"],
      description: "This is the description of the product 2",
      colors: ["#000", "#fff"],
    },
  ]
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
