import gql from 'graphql-tag';

export const TYPE_RECIPES_QUERY = gql`
  query TypeRecipes($paginationInput: PaginationInput!, $type: String!) {
    typeRecipes(pageInput: $paginationInput, type: $type) {
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
        }
        isFavourite
        photo
      }
      pages
    }
  }
`;
