import gql from 'graphql-tag';

export const FAVOURITE_RECIPES_QUERY = gql`
  query FavouriteRecipes($paginationInput: PaginationInput!) {
    favouriteRecipes(pageInput: $paginationInput) {
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
