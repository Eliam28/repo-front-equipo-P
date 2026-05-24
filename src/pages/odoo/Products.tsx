import { useEffect, useState } from "react";
import ProductCard from "./Cards/ProdcutCard";

type Product = {
  id: number;
  name: string;
  list_price: number;
  default_code?: string | null;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/odoo/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Cargando productos...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
  <div>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
}

export default Products;