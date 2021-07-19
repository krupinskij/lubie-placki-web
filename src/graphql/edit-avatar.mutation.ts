import gql from 'graphql-tag';

export const EDIT_AVATAR_MUTATION = gql`
  mutation EditAvatar($file: Upload!) {
    editAvatar(file: $file) {
      _id
    }
  }
`;
