"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import products from "@/data/products.json";

export default function Home() {
  const [visibleProductsCount, setVisibleProductsCount] = useState(3);

  const handleShowMore = () => {
    setVisibleProductsCount((prev) => prev + 3); // Показать 3 дополнительных продукта
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Наши товары</h1>
      <div className={styles.grid}>
        {products.slice(0, visibleProductsCount).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
      {visibleProductsCount < products.length && (
        <button onClick={handleShowMore} className={styles.showMoreButton}>
          Показать больше
        </button>
      )}
    </div>
  );
}
