import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Product } from "../../types/types";

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!product) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={product.image}
          style={styles.image}
          contentFit="contain"
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>
        {product.rating ? (
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>★ {product.rating.rate.toFixed(1)}</Text>
            <Text style={styles.ratingCount}>
              {product.rating.count} reviews
            </Text>
          </View>
        ) : null}
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>PRICE</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>About this item</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f7f3",
    flexGrow: 1,
    padding: 18,
    paddingBottom: 32,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f7f3",
  },
  loadingText: {
    color: "#63736a",
    fontSize: 14,
    marginTop: 12,
  },
  imageContainer: {
    height: 340,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e8ece6",
    borderRadius: 22,
    borderWidth: 1,
    elevation: 2,
    padding: 20,
    shadowColor: "#183b30",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  productInfo: {
    paddingTop: 20,
  },
  category: {
    alignSelf: "flex-start",
    backgroundColor: "#e7eee8",
    borderRadius: 20,
    color: "#416650",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 7,
    textTransform: "uppercase",
  },
  title: {
    color: "#183b30",
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: -0.4,
    lineHeight: 34,
    marginTop: 14,
  },
  ratingRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 12,
  },
  rating: {
    color: "#9b6b22",
    fontSize: 14,
    fontWeight: "800",
  },
  ratingCount: {
    color: "#7a857e",
    fontSize: 13,
    marginLeft: 8,
  },
  priceCard: {
    alignItems: "center",
    backgroundColor: "#e9f0e9",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  priceLabel: {
    color: "#63766a",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  price: {
    color: "#183b30",
    fontSize: 25,
    fontWeight: "800",
  },
  descriptionCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e8ece6",
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 16,
    padding: 18,
  },
  descriptionTitle: {
    color: "#25362d",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 9,
  },
  description: {
    color: "#6d7971",
    fontSize: 16,
    lineHeight: 25,
  },
});
