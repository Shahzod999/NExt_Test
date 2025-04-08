"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.scss";
import { useCart } from "@/context/ProductContext";

export type ProductTypes = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const ProductCard = ({ id, name, price, image }: ProductTypes) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const productInCart = cart.find((item) => item.id === id);
  const quantity = productInCart?.quantity || 0;

  const handleAddToCart = () => {
    addToCart({ id, name, price, image }); // добавляем новый или увеличиваем существующий
  };

  const handleIncrease = () => {
    increaseQuantity(id);
  };

  const handleDecrease = () => {
    decreaseQuantity(id);
  };

  return (
    <div className={styles.card}>
      <Link href={`/product/${id}`} className={styles.productLink}>
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={name}
            width={200}
            height={400}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>{price} ₽</p>
        </div>
      </Link>
      <div className={styles.buttonContainer}>
        {quantity === 0 ? (
          <button className={styles.button} onClick={handleAddToCart}>
            В корзину
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
  );
};
