import { View, StyleSheet, Image, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import RepositoryItemStat from './RepositoryItemStat';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

const RepositoryItem = ({ data, showButton }) => {
  const { id } = useParams();
  const repository = useRepository(id);

  if (data === null) {
    if (repository.loading) {
      return <Text>Loading...</Text>
    }
    data = repository?.data?.repository;
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      marginBottom: 10,
    },
    containerInfo: {
      padding: 10,
      marginBottom: 10,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginRight: 10,
    },
    containerFlex: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "flex-start",
    },
    containerText: {
      flexShrink: 1,
    },
    containerStats: {
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "row",
      marginBottom: 10,
    },
    langueageTag: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
      alignSelf: 'flex-start',
      marginTop: 5,
      marginBottom: 10,
    },
    tagText: {
      color: theme.colors.textAppBar,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 12,
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
  });

  return (
    <View testID='repositoryItem' style={styles.container}>
      <View style={styles.containerInfo}>
        <View style={styles.containerFlex}>
          <Image source={{ uri: data.ownerAvatarUrl }} style={styles.image} />

          <View style={styles.containerText}>
            <Text fontWeight={'bold'}>{data.fullName}</Text>
            <Text color={'textSecondary'}>{data.description}</Text>

            <View style={styles.langueageTag}>
              <Text style={styles.tagText}>{data.language}</Text>
            </View>

          </View>
        </View>
      </View>


      <View style={styles.containerStats}>
        <RepositoryItemStat data={data.forksCount} text={"Forks"} />
        <RepositoryItemStat data={data.stargazersCount} text={"Stars"} />
        <RepositoryItemStat data={data.ratingAverage} text={"Rating"} />
        <RepositoryItemStat data={data.reviewCount} text={"Reviews"} />
      </View>

      {showButton ?
        <View>
          <Pressable onPress={() => Linking.openURL(`${data.url}`)} style={styles.button}>
            <Text fontWeight={"bold"} style={styles.buttonText}>
              Open in GitHub
            </Text>
          </Pressable>
        </View>
        : null}
    </View>
  )
}

export default RepositoryItem;
