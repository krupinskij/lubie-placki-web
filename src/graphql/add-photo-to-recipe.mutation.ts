import gql from 'graphql-tag';

export const ADD_PHOTO_TO_RECIPE_MUTATION = gql`
  mutation AddPhotoToRecipe($input: PhotoInput!) {
    addPhotoToRecipe(input: $input) {
      _id
    }
  }
`;
