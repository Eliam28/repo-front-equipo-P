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
        background: "#fff",
        borderRadius: "18px",
        padding: "20px",
        marginBottom: "18px",
        border: "1px solid #ececec",
        boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
        transition: "0.2s ease",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            background: "#304ffe",
            color: "white",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          ID #{product.id}
        </span>

        <span
          style={{
            color: "#777",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {product.default_code || "Sin código"}
        </span>
      </div>

      <h3
        style={{
          fontSize: "22px",
          color: "#1f1f1f",
          fontWeight: 700,
          lineHeight: 1.3,
        }}
      >
        {product.name}
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "13px",
              color: "#888",
              marginBottom: "4px",
            }}
          >
            Precio
          </p>

          <h2
            style={{
              color: "#304ffe",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            ${product.list_price}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;