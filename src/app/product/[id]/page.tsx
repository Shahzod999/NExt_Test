"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";
import styles from "./ProductPage.module.scss";
import { useCart } from "@/context/ProductContext";
import { ProductTypes } from "@/components/ProductCard/ProductCard";
import { use } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductPage({ params }: Props) {
  const { id } = use(params);

  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const product = products.find((p) => p.id === parseInt(id)) as ProductTypes;

  // Проверяем, есть ли этот продукт в корзине
  const productInCart = cart.find((item) => item.id === product?.id);
  const quantity = productInCart?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(product); // добавляем новый или увеличиваем существующий
  };

  const handleIncrease = () => {
    increaseQuantity(product.id);
  };

  const handleDecrease = () => {
    decreaseQuantity(product.id);
  };

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Назад к товарам
      </Link>

      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className={styles.image}
          />
        </div>

        <div className={styles.details}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{product.price} ₽</p>

          <div className={styles.description}>
            <h2>Описание</h2>
            <p>
              Это высококачественный продукт, который предлагает отличное
              соотношение цены и качества. Идеально подходит для повседневного
              использования и обеспечивает превосходный пользовательский опыт.
            </p>
          </div>

          <div className={styles.features}>
            <h2>Характеристики</h2>
            <ul>
              <li>Высокое качество сборки</li>
              <li>Современный дизайн</li>
              <li>Длительный срок службы</li>
              <li>Гарантия 1 год</li>
            </ul>
          </div>

          {quantity === 0 ? (
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}>
              Добавить в корзину
            </button>
          ) : (
            <div className={styles.quantityControl}>
              <button onClick={handleDecrease}>−</button>
              <span>{quantity}</span>
              <button onClick={handleIncrease}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
