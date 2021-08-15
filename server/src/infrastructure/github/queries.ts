// used to tell the eslint this is a graphql query.
// Won't be necessary once the eslint-plugin-graphql
// /* GraphQL */ comment tags are supported.
import gql from 'fake-tag';

export const getUserWithRepositoryQuery = gql`
  query GetUserWithRepository($repoOwner: String!) {
    user(login: $repoOwner) {
      id
      name
      avatarUrl
      bio
      repository(name: "ama") {
        id
        name
      }
    }
  }
`;

export const getAuthorizedUserQuery = gql`
  query GetAuthorizedUser {
    viewer {
      login
      email
      avatarUrl
    }
  }
`;
