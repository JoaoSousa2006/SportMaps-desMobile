import { ExplorePage, type DiscoveryPageProps } from "./ExplorePage";

export function FavoritesPage(props: DiscoveryPageProps) {
  return <ExplorePage {...props} isFavorites />;
}