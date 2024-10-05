import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import ReviewItem from "./ReviewItem";
import Text from "./Text";
import * as Linking from 'expo-linking';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      marginBottom: 20,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 2,
      alignSelf: 'stretch',
      marginTop: 5,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5,
    },
    buttonText: {
      color: theme.colors.textAppBar,
      textAlign: "center",
    },
  })
  return (
    <View style={styles.container}>
      <RepositoryItem data={repository} />
      <Pressable onPress={() => Linking.openURL(`${data.url}`)} style={styles.button}>
        <Text fontWeight={"bold"} style={styles.buttonText}>
          Open in GitHub
        </Text>
      </Pressable>
    </View>
  )
};


const SingleRepository = () => {
  const { id } = useParams();
  const repository = useRepository(id);

  if (repository.loading) {
    return <Text>Loading...</Text>
  }
  data = repository?.data?.repository;
  return (
    <FlatList
      data={data.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={data} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
