import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Authenticate($username: String!, $password: String!) {
  authenticate(credentials: { username: $username, password: $password }) {
    accessToken
  }
}
`;
