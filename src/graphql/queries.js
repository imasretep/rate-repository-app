import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
  repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
    edges {
      node {
        id
        ownerAvatarUrl
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
      }
    }
  }  
}
`;

export const ME = gql`
query me{
  me {
    id
    username
  }
}
`;


export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      ownerAvatarUrl
      description
      language
      stargazersCount
      forksCount
      ratingAverage
      reviewCount
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

