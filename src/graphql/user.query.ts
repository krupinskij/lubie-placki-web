import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query User($id: String!) {
    user(id: $id) {
      _id
      username
      bio
      avatar
    }
  }
`;
