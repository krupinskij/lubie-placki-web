import gql from 'graphql-tag';

export const FAVOURITE_RECIPES_QUERY = gql`
  query {
    favouriteRecipes {
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
  }
`;
