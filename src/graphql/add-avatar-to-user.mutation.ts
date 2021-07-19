import gql from 'graphql-tag';

export const ADD_AVATAR_TO_USER_MUTATION = gql`
  mutation AddAvatarToUser($avatarInput: AvatarInput!) {
    addAvatarToUser(avatarInput: $avatarInput) {
      _id
    }
  }
`;
