import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <section className="products-section">
      <h2>İlanlar</h2>

      <div className="products">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image_url} alt={p.title} />

            <h3>{p.title}</h3>

            {p.price === "0.00" ? (
              <div className="badge">Bağış🎁</div>
            ) : (
              <p>{p.price} ₺</p>
            )}

            
            {token ? (
              <p>İletişim: rabia@ecocampus.com</p>
            ) : (
              <p className="login-warning">
                Detay bilgiler için lütfen giriş yapınız.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;







