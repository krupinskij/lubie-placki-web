import gql from 'graphql-tag';

export const ADD_TO_FAVOURITE_MUTATION = gql`
  mutation AddToFavourite($credentials: String!) {
    addToFavourite(id: $credentials) {
      _id
    }
  }
`;
