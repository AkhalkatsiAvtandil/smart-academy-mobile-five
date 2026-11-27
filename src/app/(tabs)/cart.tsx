import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Cart, Product } from "../../types/types";
import CartSkeleton from "../skeletons/CartSkeleton";

const CartScreen = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCart = async () => {
        try {
          const saved = await AsyncStorage.getItem("cartIds");

          if (saved !== null) {
            const savedItems = JSON.parse(saved) as
              | number[]
              | { productId: number; quantity: number }[];

            const cartItems = savedItems.map((item) =>
              typeof item === "number"
                ? { productId: item, quantity: 1 }
                : item,
            );
            const productDetails = await Promise.all(
              cartItems.map(async ({ productId }) => {
                const productResponse = await fetch(
                  `https://fakestoreapi.com/products/${productId}`,
                );
                return (await productResponse.json()) as Product;
              }),
            );

            setProducts(productDetails);
            setCart({
              id: 1,
              userId: 1,
              date: new Date().toISOString(),
              products: cartItems,
            });
            return;
          }

          const response = await fetch("https://fakestoreapi.com/carts/1");
          const data: Cart = await response.json();
          setCart(data);

          const productDetails = await Promise.all(
            data.products.map(async ({ productId }) => {
              const productResponse = await fetch(
                `https://fakestoreapi.com/products/${productId}`,
              );
              return (await productResponse.json()) as Product;
            }),
          );
          setProducts(productDetails);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };

      fetchCart();
    }, []),
  );

  if (!cart) {
    return <CartSkeleton />;
  }

  const updateQuantity = async (productId: number, change: number) => {
    const nextProducts = cart.products
      .map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + change }
          : item,
      )
      .filter((item) => item.quantity > 0);

    setCart({ ...cart, products: nextProducts });
    await AsyncStorage.setItem("cartIds", JSON.stringify(nextProducts));
  };

  const cartTotal = cart.products.reduce((total, item) => {
    const product = products.find(({ id }) => id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Shopping cart</Text>
          <Text style={styles.metadata}>
            Cart #{cart.id} · {new Date(cart.date).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.userId}>User #{cart.userId}</Text>
      </View>

      <View style={styles.items}>
        {cart.products.map((item) => {
          const product = products.find(({ id }) => id === item.productId);

          if (!product) {
            return null;
          }

          const itemTotal = product.price * item.quantity;

          return (
            <View key={item.productId} style={styles.item}>
              <Image
                source={product.image}
                style={styles.image}
                contentFit="contain"
              />
              <View style={styles.itemContent}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {product.title}
                </Text>
                <Text style={styles.price}>
                  ${product.price.toFixed(2)} each
                </Text>
                <View style={styles.itemFooter}>
                  <View style={styles.quantityControls}>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.productId, -1)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </Pressable>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.productId, 1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.itemTotal}>${itemTotal.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.total}>${cartTotal.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "700",
  },
  metadata: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 6,
  },
  userId: {
    color: "#2563eb",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
  },
  items: {
    gap: 12,
  },
  item: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    flexDirection: "row",
    padding: 12,
  },
  image: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    height: 110,
    width: 90,
  },
  itemContent: {
    flex: 1,
    marginLeft: 14,
  },
  productTitle: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },
  price: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 8,
  },
  itemFooter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  quantityControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  quantityButton: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 6,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  quantityButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  quantity: {
    color: "#475569",
    fontSize: 14,
    minWidth: 20,
    textAlign: "center",
  },
  itemTotal: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "700",
  },
  totalCard: {
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 18,
  },
  totalLabel: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  total: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },
});
