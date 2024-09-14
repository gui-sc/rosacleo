import Header from "./components/header";
import ProductCard from "./components/productCard";
import { Product } from "./types/product";

export default function Home() {
  const products: Product[] = [
    {
      name: "Product 1",
      price: 100,
      image: "/product1.png",
      description: "This is the description of the product 1"
    },
    {
      name: "Product 2",
      price: 200,
      image: "/product2.png",
      description: "This is the description of the product 2"
    },
    {
      name: "Product 1",
      price: 100,
      image: "/product1.png",
      description: "This is the description of the product 1"
    },
    {
      name: "Product 2",
      price: 200,
      image: "/product2.png",
      description: "This is the description of the product 2"
    },
    {
      name: "Product 1",
      price: 100,
      image: "/product1.png",
      description: "This is the description of the product 1"
    },
    {
      name: "Product 2",
      price: 200,
      image: "/product2.png",
      description: "This is the description of the product 2"
    },
    {
      name: "Product 1",
      price: 100,
      image: "/product1.png",
      description: "This is the description of the product 1"
    },
    {
      name: "Product 2",
      price: 200,
      image: "/product2.png",
      description: "This is the description of the product 2"
    },
  ]
  return (
    <div >
      <Header />
      <div className="grid gap-5 p-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">

        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}

      </div>
    </div>
  );
}
