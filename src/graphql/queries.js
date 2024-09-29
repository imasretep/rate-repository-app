import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
  repositories {
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


