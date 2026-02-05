import { useRef } from "react";
import ProductCard from "../components/ProductCard";
import RootModal from "../components/RootModal";
import { useFetch } from "../hooks/useFetch";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";

export default function Home() {
  const { data, error, isLoading } =
    useFetch("http://localhost:8080/api/v1/products");

  const modalRef = useRef();

  if (error) return <div>Something went wrong</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-2 select-none">
      <Navbar />
      <div className="flex gap-4">
        {/* Sidebar */}
        <Filters />

        {/* Products */}
        <main className="flex-1">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {data.map(product => (
              <ProductCard
                key={product.name}
                product={product}
                onOpenModal={() => modalRef.current.open(product)}
              />
            ))}
          </div>
        </main>

        <RootModal ref={modalRef} />
      </div>
    </div>
  );
}
