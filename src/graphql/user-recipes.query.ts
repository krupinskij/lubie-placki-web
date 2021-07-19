import gql from 'graphql-tag';

export const USER_RECIPES_QUERY = gql`
  query UserRecipes($paginationInput: PaginationInput!, $owner: String!) {
    userRecipes(pageInput: $paginationInput, owner: $owner) {
      data {
        _id
        name
        description
        ingredients {
          product
          quantity
          unit
        }
        directions {
          text
        }
        hints {
          text
        }
        createdAt
        owner {
          _id
          username
          avatar
        }
        isFavourite
        photo
      }
      pages
    }
  }
`;
