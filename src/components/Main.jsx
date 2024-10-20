import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import ReviewForm from './ReviewForm.jsx';
import theme from '../theme';
import { Route, Routes, Navigate } from 'react-router-native';
import SingleRepository from './SingleRepository.jsx';
import SignUp from './SignUp.jsx';
import UserReview from './UserReview.jsx';

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
        <Route path="/userreviews" element={<UserReview/>} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/repositories" element={<RepositoryList />} />
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </View>
  );
};

export default Main;
