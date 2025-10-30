import React, { useEffect, useState, useContext } from "react";
import Papa from "papaparse";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../contexts/CartContext";
import "./ProductPage.css";

export default function ProductPage() {
  const { t } = useTranslation();
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    fetch("/products.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true }).data;
        const cleanData = parsed
          .filter((p) => p.name && p.price)
          .map((p, i) => ({
            id: i + 1,
            name: p.name,
            category: p.category || "General",
            price: parseFloat(p.price),
            image: p.image || "",
          }));
        setProducts(cleanData);
      });
  }, []);

  // Función: Filtrado y orden
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category === "all" ? true : p.category === category))
    .filter((p) => (maxPrice ? p.price <= maxPrice : true))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(start, start + productsPerPage);

  // Función: Reset de búsqueda
  const clearSearch = () => {
    setSearch("");
    setCurrentPage(1);
  };

  // Función: Cambio de filtro → reinicia a página 1
  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  // Cambio de página → scroll al inicio
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="product-page">
      <h1 className="page-title">{t("collection.title")}</h1>

      <div className="filters-bar">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder={t("collection.searchPlaceholder")}
            value={search}
            onChange={(e) => handleFilterChange(setSearch)(e)}
            className="search-input"
          />
          {search && (
            <button onClick={clearSearch} className="clear-search" title={t("collection.clearSearch")}>
              ✕
            </button>
          )}
        </div>

        <button
          className="filter-btn"
          onClick={() => document.querySelector(".filters-panel").classList.toggle("open")}
        >
          ⚙️ {t("collection.filters")}
        </button>
      </div>

      <div className="filters-panel">
        <select value={category} onChange={handleFilterChange(setCategory)}>
          <option value="all">{t("collection.allCategories")}</option>
          <option value="Arte">{t("collection.art")}</option>
          <option value="NFT">{t("collection.nft")}</option>
          <option value="Digital">{t("collection.digital")}</option>
          <option value="Físico">{t("collection.physical")}</option>
        </select>

        <select value={sortOrder} onChange={handleFilterChange(setSortOrder)}>
          <option value="none">{t("collection.sortBy")}</option>
          <option value="asc">{t("collection.priceAsc")}</option>
          <option value="desc">{t("collection.priceDesc")}</option>
        </select>

        <input
          type="number"
          placeholder={t("collection.maxPrice")}
          value={maxPrice}
          onChange={handleFilterChange(setMaxPrice)}
        />
      </div>

      <div className="grid">
        {paginatedProducts.map((p) => (
          <div key={p.id} className="card">
            <div
              className="thumb"
              style={{
                backgroundImage: `url(${p.image || "https://via.placeholder.com/240"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <h3>{p.name}</h3>
            <p>${p.price.toFixed(2)}</p>
            <button className="btn-buy" onClick={() => addToCart(p)}>
              {t("collection.addToCart")}
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          ◀
        </button>
        <span>
          {t("collection.page")} {currentPage} {t("collection.of")} {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
    </section>
  );
}
