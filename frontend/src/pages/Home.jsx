import { useRef } from "react";
import ProductCard from "../components/ProductCard";
import RootModal from "../components/RootModal";
import { useFetch } from "../hooks/useFetch"
import Filters from "../components/Filters";

export default function Home() {
  const { data, error, isLoading } = useFetch('http://localhost:8080/api/v1/products');
  const modalRef = useRef();

  if (error) {
    return (
      <div>Something went wrong</div>
    )
  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <Filters />
      <div className="grid grid-cols-1 gap-2 md:m-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          data.map(product =>
            <ProductCard product={product} onOpenModal={() => modalRef.current.open(product)} />)
        }
      </div>
      <RootModal ref={modalRef} />
    </div>
  )
}
