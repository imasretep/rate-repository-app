import { Text as TabText, StyleSheet, Pressable } from 'react-native';
import { Link } from "react-router-native";
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textAppBar,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    marginHorizontal: 10,
  },
});


const AppBarTab = ({ tabName, route }) => {

  return (
    <Pressable>
      <Link to={route}>
        <TabText style={styles.text}>{tabName}</TabText>
      </Link>
    </Pressable>

  )
}

export default AppBarTab;
