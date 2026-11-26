import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Product } from "../../types/types";

export default function Index() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [cartIds, setCartIds] = useState<number[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("cartIds").then((saved) => {
        if (!saved) {
          setCartIds([]);
          return;
        }

        const items = JSON.parse(saved) as
          | number[]
          | { productId: number; quantity: number }[];
        setCartIds(
          items
            .filter((item) => typeof item === "number" || item.quantity > 0)
            .map((item) => (typeof item === "number" ? item : item.productId)),
        );
      });
    }, []),
  );

  const addToCart = async (productId: number) => {
    if (cartIds.includes(productId)) return;

    const nextIds = [...cartIds, productId];
    setCartIds(nextIds);
    await AsyncStorage.setItem(
      "cartIds",
      JSON.stringify(nextIds.map((id) => ({ productId: id, quantity: 1 }))),
    );
  };

  const removeFromCart = async (productId: number) => {
    const saved = await AsyncStorage.getItem("cartIds");
    const items = saved
      ? (JSON.parse(saved) as
          | number[]
          | { productId: number; quantity: number }[])
      : cartIds.map((id) => ({ productId: id, quantity: 1 }));

    const nextItems = items
      .map((item) =>
        typeof item === "number" ? { productId: item, quantity: 1 } : item,
      )
      .filter((item) => item.productId !== productId);

    setCartIds(nextItems.map((item) => item.productId));
    await AsyncStorage.setItem("cartIds", JSON.stringify(nextItems));
  };

  if (!products) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContent}
      data={products}
      columnWrapperStyle={styles.row}
      initialNumToRender={6}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>THE MARKET</Text>
          <Text style={styles.heroTitle}>Find something{"\n"}worth keeping.</Text>
          <View style={styles.heroFooter}>
            <Text style={styles.heroSubtitle}>
              Everyday picks, made easy.
            </Text>
            <Text style={styles.productCount}>{products.length} items</Text>
          </View>
        </View>
      }
      numColumns={2}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
          onPress={() =>
            router.push({ pathname: "/details/[id]", params: { id: item.id } })
          }
        >
          <View style={styles.imageStage}>
            <Image
              source={item.image}
              style={styles.image}
              contentFit="contain"
            />
          </View>
          <Text style={styles.category} numberOfLines={1}>
            {item.category}
          </Text>
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <View style={styles.actions}>
            <Pressable
              style={[
                styles.actionButton,
                cartIds.includes(item.id) ? styles.addedButton : styles.addButton,
              ]}
              onPress={() => addToCart(item.id)}
            >
              <Text
                style={[
                  styles.actionText,
                  cartIds.includes(item.id) && styles.addedText,
                ]}
              >
                {cartIds.includes(item.id) ? "In cart" : "Add to cart"}
              </Text>
            </Pressable>
            {cartIds.includes(item.id) ? (
              <Pressable
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.actionText}>Remove</Text>
              </Pressable>
            ) : null}
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: "#f6f7f3",
    paddingHorizontal: 18,
    paddingBottom: 28,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f7f3",
  },
  loadingText: {
    color: "#63736a",
    fontSize: 15,
  },
  hero: {
    paddingTop: 24,
    paddingBottom: 22,
  },
  eyebrow: {
    color: "#507362",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
  },
  heroTitle: {
    color: "#183b30",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -0.8,
    lineHeight: 40,
    marginTop: 10,
  },
  heroFooter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  heroSubtitle: {
    color: "#748179",
    fontSize: 14,
  },
  productCount: {
    color: "#507362",
    fontSize: 12,
    fontWeight: "700",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e8ece6",
    borderRadius: 18,
    borderWidth: 1,
    elevation: 2,
    padding: 10,
    shadowColor: "#183b30",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    width: "48.5%",
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  imageStage: {
    alignItems: "center",
    backgroundColor: "#f3f5f0",
    borderRadius: 13,
    height: 150,
    justifyContent: "center",
    marginBottom: 12,
    padding: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  category: {
    color: "#668071",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  productTitle: {
    color: "#202d27",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
    marginTop: 5,
    minHeight: 38,
  },
  price: {
    color: "#183b30",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 8,
  },
  actions: {
    flexDirection: "row",
    marginTop: 11,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    minHeight: 38,
    paddingHorizontal: 6,
  },
  addButton: {
    backgroundColor: "#183b30",
  },
  addedButton: {
    backgroundColor: "#edf3ef",
  },
  deleteButton: {
    backgroundColor: "#a84d45",
    marginLeft: 6,
  },
  actionText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },
  addedText: {
    color: "#315b48",
  },
});
