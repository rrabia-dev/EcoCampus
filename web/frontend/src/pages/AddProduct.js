import { useState } from "react";
import api from "../services/api";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/products",
        {
          title,
          price,
          image_url: imageUrl,
          category_id: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("İlan eklendi");
      window.location.reload();
    } catch (err) {
      alert("Hata oluştu");
    }
  };

  return (
    <form className="add-product" onSubmit={handleSubmit}>
      <h2>İlan Ver</h2>

      <input
        placeholder="Ürün başlığı"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        placeholder="Fiyat (0 ise bağış)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        placeholder="Resim URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />

      <button type="submit">İlanı Yayınla</button>
    </form>
  );
}

export default AddProduct;
