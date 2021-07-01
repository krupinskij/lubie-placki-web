import gql from 'graphql-tag';

export const UPLOAD_PHOTO_MUTATION = gql`
  mutation UploadPhoto($file: Upload!) {
    uploadPhoto(file: $file) {
      filename
    }
  }
`;
