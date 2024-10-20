import { View, StyleSheet, } from 'react-native';
import Text from './Text';
import theme from '../theme';

const ReviewItem = ({ review }) => {
  const data = review.node ? review.node : review;

  console.log("ReviewItem.jsx", data);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fi-FI");
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      marginBottom: 10,
    },
    containerInfo: {
      padding: 10,
      marginBottom: 10,
    },
    reviewContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    reviewStyle: {
      fontSize: 20,
      color: theme.colors.primary,
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
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
      <View style={styles.containerFlex}>
          <View style={styles.reviewContainer}>
            <Text fontWeight={"bold"} style={styles.reviewStyle}>{data.rating}</Text>
          </View>

          <View style={styles.containerText}>
            {data.user?.username ? <Text fontWeight={"bold"}>{data.user.username}</Text> : <Text fontWeight={"bold"}>{data.repository.fullName}</Text>}
            <Text color={'textSecondary'}>{formatDate(data.createdAt)}</Text>
            <Text>{data.text}</Text>
          </View>

      </View>
      </View>
    </View>
  )
}

export default ReviewItem;
