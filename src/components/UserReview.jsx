import { FlatList, View, StyleSheet, Pressable, FlatListComponent } from 'react-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  searchBar: {
    marginTop: 10,
  },

  background: {
    backgroundColor: "white",
    marginBottom: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviewContainer = ({reviews}) => {
  const reviewNodes = reviews
      ? reviews.edges.map((edge) => edge.node)
      : [];

  return(
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
    />
  );
}

const UserReview = () => {
  const {loading, error, data} = useQuery(ME, {variables: {includeReviews: true}});

  if(loading){
    return null;
  }
  const reviews = data?.me?.reviews;

  return(
    <UserReviewContainer reviews={reviews}/>
  );
};

export default UserReview;
