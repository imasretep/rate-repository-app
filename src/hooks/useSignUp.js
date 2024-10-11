import { CREATE_USER } from "../graphql/mutations"
import { useMutation } from "@apollo/client";

export const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const result = await mutate({ variables: { user: { username, password } } });
    return result;
  };

  return [signUp, result];
};
