import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { User } from "../../types/types";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, []);

  if (!user) {
    return <ProfileSkeleton />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <View style={styles.identity}>
          <Text style={styles.eyebrow}>YOUR PROFILE</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact information</Text>
        <Text style={styles.sectionSubtitle}>How to reach you</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Website</Text>
          <Text style={styles.value}>{user.website}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.sectionSubtitle}>Your location details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Street</Text>
          <Text style={styles.value}>{user.address.street}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Suite</Text>
          <Text style={styles.value}>{user.address.suite}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>City</Text>
          <Text style={styles.value}>{user.address.city}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Zip code</Text>
          <Text style={styles.value}>{user.address.zipcode}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Coordinates</Text>
          <Text style={styles.value}>
            {user.address.geo.lat}, {user.address.geo.lng}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company</Text>
        <Text style={styles.sectionSubtitle}>Work and organization</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.company.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Catch phrase</Text>
          <Text style={styles.value}>{user.company.catchPhrase}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Business focus</Text>
          <Text style={styles.value}>{user.company.bs}</Text>
        </View>
      </View>

      <View style={styles.meta}>
        <Text style={styles.metaText}>User ID: {user.id}</Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f7f3",
    flexGrow: 1,
    padding: 18,
    paddingBottom: 30,
  },
  loading: {
    alignItems: "center",
    backgroundColor: "#f6f7f3",
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    color: "#63736a",
    fontSize: 15,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#183b30",
    borderRadius: 22,
    flexDirection: "row",
    marginBottom: 4,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#dce9df",
    borderColor: "#ffffff",
    borderRadius: 32,
    borderWidth: 2,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  avatarText: {
    color: "#234b39",
    fontSize: 27,
    fontWeight: "800",
  },
  identity: {
    flex: 1,
    marginLeft: 16,
  },
  eyebrow: {
    color: "#aec5b5",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  name: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "800",
    marginTop: 5,
  },
  username: {
    color: "#c4d2c8",
    fontSize: 14,
    marginTop: 3,
  },
  section: {
    backgroundColor: "#ffffff",
    borderColor: "#e8ece6",
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 17,
    paddingTop: 17,
  },
  sectionTitle: {
    color: "#203a2e",
    fontSize: 17,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#87938b",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 5,
  },
  infoRow: {
    borderTopColor: "#edf0ec",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: 11,
  },
  label: {
    color: "#87938b",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 4,
  },
  value: {
    color: "#293a30",
    fontSize: 14,
    lineHeight: 20,
  },
  meta: {
    alignItems: "center",
    paddingVertical: 22,
  },
  metaText: {
    color: "#8a968e",
    fontSize: 12,
  },
});
