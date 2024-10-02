import { View, StyleSheet, } from 'react-native';
import Text from './Text';
import theme from '../theme';

const ReviewItem = ({ review }) => {

  console.log("ReviewItem", review.node.user.username);
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
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    reviewStyle: {
      fontSize: 25,
      color: theme.colors.primary,
    },
    containerInfo: {
      padding: 10,
      marginBottom: 10,
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
            <Text style={styles.reviewStyle}>{review.node.rating}</Text>
          </View>

          <View style={styles.containerText}>
            <Text fontWeight={"bold"}>{review.node.user.username}</Text>
            <Text color={'textSecondary'}>{review.node.createdAt}</Text>
            <Text>{review.node.text}</Text>
          </View>

        </View>
      </View>
    </View>
  )
}

export default ReviewItem;
