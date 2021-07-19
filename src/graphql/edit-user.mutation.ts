import gql from 'graphql-tag';

export const EDIT_USER_MUTATION = gql`
  mutation EditUser($editUserInput: EditUserInput!) {
    editUser(editUserInput: $editUserInput) {
      _id
    }
  }
`;
