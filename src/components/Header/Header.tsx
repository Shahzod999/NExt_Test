"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Shop from "../../../public/shop.svg";
import styles from "./Header.module.scss";
import { useCart } from "@/context/ProductContext";
import products from "@/data/products.json"; // импортируйте данные о товарах

export const Header = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);

    // Фильтруем товары по мере ввода текста
    if (query.trim() !== "") {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // если поиск пустой, показываем все товары
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 100);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          My Shop
        </Link>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={search}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          {isFocused && search && (
            <div className={styles.searchResults}>
              {filteredProducts.length > 0 ? (
                <ul>
                  {filteredProducts.map((product) => (
                    <li key={product.id} className={styles.searchResultItem}>
                      <Link
                        href={`/product/${product.id}`}
                        className={styles.searchResultLink}>
                        <div className={styles.searchResultName}>
                          {product.name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Товары не найдены</p>
              )}
            </div>
          )}
        </div>

        <Link href="/cart" className={styles.cart}>
          <div className={styles.cartIcon}>
            <Image src={Shop} alt="Cart" width={24} height={24} />
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};
