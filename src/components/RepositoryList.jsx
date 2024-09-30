import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem data={item} showButton={false} />
        </Pressable>}
    />
  );
};

const RepositoryList = () => {
  const { data, error, loading } = useRepositories();

  if (loading) {
    return <Text>Loading...</Text>
  }

  const repositories = data?.repositories;

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
