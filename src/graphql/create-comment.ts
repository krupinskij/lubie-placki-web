import gql from 'graphql-tag';

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($commentInput: CommentInput!) {
    createComment(commentInput: $commentInput) {
      _id
    }
  }
`;
