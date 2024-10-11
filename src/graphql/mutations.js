import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Authenticate($username: String!, $password: String!) {
  authenticate(credentials: { username: $username, password: $password }) {
    accessToken
  }
}`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    id
    repositoryId
    repository {
      ownerName,
      name
    }
    createdAt,
    rating,
    text,
    user {
      username
    }
  }
}`;

export const CREATE_USER = gql`
mutation CreateUser($user: CreateUserInput!) {
  createUser(user: $user) {
    username
    id
  }
}`;
