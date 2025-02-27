import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  SafeAreaView,
  StatusBar,
  ListRenderItemInfo,
} from "react-native";

// Define interfaces for our data structure
interface Source {
  id: string | null;
  name: string;
}

interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export default function NewsShowcase(): React.ReactElement {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchNews = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=air%20pollution&sortBy=publishedAt&apiKey=6b56dc35d2bb4b08b7802d54fe7c251e`
      );
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = (): void => {
    setRefreshing(true);
    fetchNews();
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openArticle = (url: string): void => {
    Linking.openURL(url);
  };

  const renderNewsItem = ({
    item,
  }: ListRenderItemInfo<Article>): React.ReactElement => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openArticle(item.url)}
      activeOpacity={0.9}
    >
      {item.urlToImage ? (
        <Image
          source={{ uri: item.urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.source}>{item.source.name}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.description} numberOfLines={3}>
          {item.description || "No description available"}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.date}>{formatDate(item.publishedAt)}</Text>
          <Text style={styles.readMore}>Read more →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <View style={styles.header}>
        <View style={{ display: "flex", flexDirection:"row", gap:"5" }}>
          <Ionicons name="copy" color="#44a1a0" size={28} />
          <Text style={styles.headerTitle}>News</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Stay informed about global air quality
        </Text>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Loading latest news...</Text>
        </View>
      ) : (
        <FlatList<Article>
          data={news}
          keyExtractor={(item: Article, index: number) =>
            `${item.title}-${index}`
          }
          renderItem={renderNewsItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No articles found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F7",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#44a1a0",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 4,
  },
  listContainer: {
    padding: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 5,
    borderWidth: 2,
    borderColor: "#edf2f4",
  },
  image: {
    height: 150,
    width: "100%",
    backgroundColor: "#e9ecef",
  },
  imagePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#adb5bd",
    fontSize: 16,
  },
  contentContainer: {
    padding: 16,
  },
  source: {
    fontSize: 15,
    fontWeight: "800",
    color: "#44a1a0",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#353535",
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 15,
    color: "#495057",
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  date: {
    fontSize: 14,
    color: "#6c757d",
  },
  readMore: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#007bff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6c757d",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
});
