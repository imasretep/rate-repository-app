import { View, StyleSheet, Pressable, ScrollView } from 'react-native';

import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.appBar,
  },
  contentContainer: {
    display: 'flex',
    justifyContent: "space-between",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer} >
        <AppBarTab tabName={"Repositories"} route={"/"} />
        <AppBarTab tabName={"Sign-in"} route={"/sign"} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
