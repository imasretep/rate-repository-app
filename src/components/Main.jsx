import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import { Route, Routes, Navigate } from 'react-router-native';
import SingleRepository from './SingleRepository.jsx';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundApp,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/repositories" element={<RepositoryList />} />
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </View>
  );
};

export default Main;
