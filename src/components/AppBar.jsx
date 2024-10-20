import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';

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
  const { loading, error, data } = useQuery(ME);

  if (loading) {
    return null;
  }

  console.log(data);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer} >
        <AppBarTab tabName={"Repositories"} route={"/repositories"} />
        {data.me === null ? null : <AppBarTab tabName={"Create a review"} route={"/review"} />}
        <AppBarTab tabName={data.me === null ? "Sign in" : "Sign out"} route={"/"} />
        {data.me === null ? <AppBarTab tabName={"Sign up"} route={"/signup"} /> : null}
        {data.me === null ? null :<AppBarTab tabName={"My reviews"} route={"/userreviews"}/>}
      </ScrollView>
    </View>
  );
};

export default AppBar;
