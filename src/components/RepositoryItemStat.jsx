import { View, StyleSheet, } from 'react-native';
import Text from './Text';

const RepositoryItemStat = ({ data, text }) => {

  const styles = StyleSheet.create({
    itemStats: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const format = (number) => {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + "k";
    }
    return number;
  }

  return (
    <View style={styles.itemStats}>
      <Text fontWeight={"bold"}>{format(data)}</Text>
      <Text color={"textSecondary"}>{text}</Text>
    </View>
  )
}

export default RepositoryItemStat;
