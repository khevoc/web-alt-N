import React from "react";
import "./ProductPage.css";

export default function ProductPage() {
  const products = [
    { id: 1, name: "Crypto Canvas #1", price: "$120" },
    { id: 2, name: "Altair Vision", price: "$200" },
    { id: 3, name: "Ether Waves", price: "$180" },
    { id: 4, name: "Neon Dots", price: "$150" },
    { id: 5, name: "Shiny Nest", price: "$100" },
    { id: 6, name: "Golden Tide", price: "$180" },
    { id: 7, name: "Metal Cloud", price: "$180" },
    { id: 8, name: "Candy Rocks", price: "$180" },
  ];

  return (
    <section className="product-page">
      <h2>Collection</h2>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <div className="thumb" />
            <h3>{p.name}</h3>
            <p>{p.price}</p>
            <button className="btn-buy">Agregar al carrito</button>
          </div>
        ))}
      </div>
    </section>
  );
}
