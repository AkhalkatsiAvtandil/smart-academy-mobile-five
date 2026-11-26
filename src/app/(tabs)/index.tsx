import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Product } from "../../types/types";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

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
    return <Text style={{ padding: 20 }}>Loading products...</Text>;
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={products}
      getItemLayout={(data, index) => ({
        length: windowHeight * 0.3,
        offset: windowHeight * 0.3 * index,
        index,
      })}
      initialNumToRender={5}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          style={styles.listItem}
          onPress={() =>
            router.push({ pathname: "/details/[id]", params: { id: item.id } })
          }
        >
          <Image source={item.image} style={styles.image} />
          <Text key={item.id} style={styles.listTitle}>
            {item.title}
          </Text>
          <Text>${item.price}</Text>
          <Text>{item.description}</Text>
          <Text>Category: {item.category}</Text>
          <View style={styles.actions}>
            <Pressable
              style={[styles.actionButton, styles.addButton]}
              onPress={() => addToCart(item.id)}
            >
              <Text style={styles.actionText}>
                {cartIds.includes(item.id) ? "Added" : "Add to Cart"}
              </Text>
            </Pressable>
            {cartIds.includes(item.id) ? (
              <Pressable
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.actionText}>Delete</Text>
              </Pressable>
            ) : null}
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  listItem: {
    width: windowWidth * 0.9,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: "#2563eb",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
  },
  actionText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
