import gql from 'graphql-tag';

export const COMMENTS_QUERY = gql`
  query CommentsByRecipeId($paginationInput: PaginationInput!, $recipeId: String!) {
    commentsByRecipeId(pageInput: $paginationInput, recipeId: $recipeId) {
      data {
        _id
        text
        createdAt
        owner {
          _id
          username
          avatar
        }
      }
      pages
    }
  }
`;
