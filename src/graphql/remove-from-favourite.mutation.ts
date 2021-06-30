import gql from 'graphql-tag';

export const REMOVE_FROM_FAVOURITE_MUTATION = gql`
  mutation RemoveFromFavourite($credentials: String!) {
    removeFromFavourite(id: $credentials) {
      _id
    }
  }
`;
