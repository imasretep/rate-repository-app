import { LOGIN } from "../graphql/mutations"
import { useMutation } from "@apollo/client";
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

export const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    const result = await mutate({ variables: { username, password } });

    if (result.data.authenticate) {
      const { accessToken } = result.data.authenticate;
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore();
    }
    return result;
  };

  return [signIn, result];
};
