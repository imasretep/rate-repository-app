import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import { Menu, Button } from 'react-native-paper';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderByMenu = ({ setOrderBy, setOrderDirection }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => {
    setVisible(true)
  };

  const closeMenu = () => {
    setVisible(false)
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Show menu</Button>}
      >
        <Menu.Item leadingIcon="redo" onPress={() => {
          setOrderBy("CREATED_AT");
          setOrderDirection("DESC");
        }} title="Latest repositories" />
        <Menu.Item leadingIcon="redo" onPress={() => {
          setOrderBy("RATING_AVERAGE");
          setOrderDirection("DESC")
        }} title="Highest rated repositories" />
        <Menu.Item leadingIcon="redo" onPress={() => {
          setOrderBy("RATING_AVERAGE");
          setOrderDirection("ASC")
        }} title="Lowest rated repositories" />
      </Menu>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, setOrderBy, setOrderDirection }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem data={item} showButton={false} />
        </Pressable>}
      ListHeaderComponent={<OrderByMenu setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />}
    />
  );
};

const RepositoryList = () => {
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const { data, error, loading } = useRepositories(orderBy, orderDirection);

  console.log(orderBy);
  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const repositories = data?.repositories;

  return (
    <RepositoryListContainer repositories={repositories} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />
  );
};

export default RepositoryList;
