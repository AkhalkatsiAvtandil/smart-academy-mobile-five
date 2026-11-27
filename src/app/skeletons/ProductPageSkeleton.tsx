import { ScrollView, StyleSheet, View } from "react-native";

const ProductPageSkeleton = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.eyebrow} />
        <View style={styles.heroTitle} />
        <View style={styles.heroSubtitle} />
      </View>
      <View style={styles.grid}>
        {Array.from({ length: 6 }, (_, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.image} />
            <View style={styles.category} />
            <View style={styles.title} />
            <View style={styles.price} />
            <View style={styles.button} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProductPageSkeleton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f7f3",
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingBottom: 28,
  },
  hero: {
    paddingTop: 24,
    paddingBottom: 22,
  },
  eyebrow: {
    backgroundColor: "#d9d9d9",
    borderRadius: 4,
    height: 10,
    width: 90,
  },
  heroTitle: {
    backgroundColor: "#d9d9d9",
    borderRadius: 8,
    height: 76,
    marginTop: 12,
    width: "75%",
  },
  heroSubtitle: {
    backgroundColor: "#d9d9d9",
    borderRadius: 4,
    height: 14,
    marginTop: 14,
    width: "50%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e8ece6",
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
    padding: 10,
    width: "48.5%",
  },
  image: {
    backgroundColor: "#edf0ec",
    borderRadius: 13,
    height: 150,
  },
  category: {
    backgroundColor: "#d9d9d9",
    borderRadius: 4,
    height: 10,
    marginTop: 12,
    width: "55%",
  },
  title: {
    backgroundColor: "#d9d9d9",
    borderRadius: 6,
    height: 38,
    marginTop: 7,
    width: "90%",
  },
  price: {
    backgroundColor: "#d9d9d9",
    borderRadius: 6,
    height: 18,
    marginTop: 8,
    width: "45%",
  },
  button: {
    backgroundColor: "#dce4de",
    borderRadius: 10,
    height: 38,
    marginTop: 11,
  },
});
