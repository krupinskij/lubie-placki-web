import gql from 'graphql-tag';

export const RECIPES_QUERY = gql`
  query {
    recipes {
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
