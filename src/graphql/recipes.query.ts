import gql from 'graphql-tag';

export const RECIPES_QUERY = gql`
  query Recipes($paginationInput: PaginationInput!) {
    recipes(pageInput: $paginationInput) {
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
