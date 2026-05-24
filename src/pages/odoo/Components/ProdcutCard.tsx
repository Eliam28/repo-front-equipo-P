type Product = {
  id: number;
  name: string;
  list_price: number;
  default_code?: string | null;
};

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        background: "white",
      }}
    >
      <h3>{product.name}</h3>
      <p>ID: {product.id}</p>
      <p>Código: {product.default_code || "Sin código"}</p>
      <p>${product.list_price}</p>
    </div>
  );
}

export default ProductCard;