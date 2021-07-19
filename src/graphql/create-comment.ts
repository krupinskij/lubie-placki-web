import gql from 'graphql-tag';

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($text: String!) {
    createComment(text: $text) {
      _id
    }
  }
`;
