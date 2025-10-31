import React, { useEffect, useState, useContext } from "react";
import Papa from "papaparse";
import { useTranslation } from "react-i18next";
import { CartContext } from "/src/contexts/CartContext.jsx";
import "./ProductPage.css";

export default function ProductPage() {
  const { addToCart } = useContext(CartContext);
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const productsPerPage = 20;

  useEffect(() => {
    fetch("/products.csv")
      .then((res) => {
        if (!res.ok) throw new Error("products.csv not found");
        return res.text();
      })
      .then((text) => {
        const parsed = Papa.parse(text, { header: true }).data;
        const cleanData = parsed
          .filter((p) => p.name && p.price)
          .map((p, i) => {
            // normalize image path: ensure leading slash
            let img = p.image ? String(p.image).trim() : "";
            if (img && !img.startsWith("/")) img = "/" + img;
            // fallback to category-based file (normalize category -> no spaces lower)
            const catKey = p.category ? String(p.category).trim() : "uncategorized";
            const fallback = `/images/${catKey.toLowerCase().replace(/\s+/g, "")}.gif`;
            return {
              id: i + 1,
              name: String(p.name).trim(),
              category: catKey,
              price: Number(parseFloat(p.price) || 0),
              image: img || fallback,
            };
          });
        setProducts(cleanData);
      })
      .catch((err) => {
        console.error("Error loading products.csv:", err);
      });
  }, []);

  // derive categories from data (keeps UI in sync)
  const derivedCategories = ["all", ...Array.from(new Set(products.map((p) => p.category))).sort()];

  // Filtering + sorting
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category === "all" ? true : p.category === category))
    .filter((p) => (maxPrice ? p.price <= Number(maxPrice) : true))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const start = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(start, start + productsPerPage);

  // when search or filter changes, reset to page 1 and scroll up
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, category, sortOrder, maxPrice]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // add to cart with animation
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItem(product.id);
    // clear effect after animation ends (1s)
    setTimeout(() => setAddedItem(null), 900);
  };

  const clearSearch = () => {
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <section className="product-page">
      {/* title (uses i18n keys; fallback text if key missing) */}
      <h2 className="page-title">{t("collection.title", "Collection")}</h2>

      {/* spaced filters/search area */}
      <div className="filters-wrapper">
        <div className="filters-bar">
          <div className="search-box">
            <input
              type="text"
              placeholder={t("collection.searchPlaceholder", "Search product...")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              aria-label={t("collection.searchPlaceholder", "Search product...")}
            />
            {search && (
              <button className="clear-btn" onClick={clearSearch} aria-label={t("collection.clearSearch","Clear search")}>
                ✕
              </button>
            )}
          </div>

          <div className="filters-actions">
            <button className="filter-btn" onClick={() => setShowFilters((s) => !s)}>
              {t("collection.filters", "Filters ⚙️")}
            </button>
          </div>
        </div>

        <div className={`filters-panel ${showFilters ? "open" : ""}`}>
          <label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {derivedCategories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? t("collection.allCategories", "All categories") : c}
                </option>
              ))}
            </select>
          </label>

          <label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="none">{t("collection.sortBy", "Sort by")}</option>
              <option value="asc">{t("collection.priceAsc", "Price: Low to High")}</option>
              <option value="desc">{t("collection.priceDesc", "Price: High to Low")}</option>
            </select>
          </label>

          <label className="maxprice">
            <input
              type="number"
              placeholder={t("collection.maxPrice", "Max price")}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* grid */}
      <div className="grid products-grid">
        {paginatedProducts.map((p) => (
          <div key={p.id} className={`card ${addedItem === p.id ? "added" : ""}`}>
            <div
              className="thumb"
              role="img"
              aria-label={p.name}
              style={{
                backgroundImage: `url(${p.image})`,
              }}
            />
            <h3>{p.name}</h3>
            <p className="price">${p.price.toFixed(2)}</p>

            <div className="card-actions">
              <button className="btn-buy" onClick={() => handleAddToCart(p)}>
                {t("collection.addToCart", "Add to cart")}
              </button>
            </div>

            {/* floating +1 animation */}
            {addedItem === p.id && <span className="added-badge">+1</span>}
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          ◀
        </button>
        <span>
          {t("collection.page", "Page")} {currentPage} {t("collection.of", "of")} {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          ▶
        </button>
      </div>
    </section>
  );
}
