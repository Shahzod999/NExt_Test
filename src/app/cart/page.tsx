"use client";

import { useCart } from "@/context/ProductContext";
import Image from "next/image";
import styles from "./Cart.module.scss";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <div className={styles.cart}>
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div>
          <ul className={styles.cartList}>
            {cart.map((product) => (
              <li key={product.id} className={styles.cartItem}>
                <div className={styles.productInfo}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className={styles.productImage}
                  />
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.price} ₽</p>
                    <div className={styles.quantityControl}>
                      <button onClick={() => decreaseQuantity(product.id)}>-</button>
                      <span>{product.quantity}</span>
                      <button onClick={() => increaseQuantity(product.id)}>+</button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className={styles.removeButton}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart} className={styles.clearButton}>
            Очистить корзину
          </button>
        </div>
      )}
    </div>
  );
}
