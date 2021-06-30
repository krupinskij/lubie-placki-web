import gql from 'graphql-tag';

export const TYPE_RECIPES_QUERY = gql`
  query Recipe($type: String!) {
    typeRecipes(type: $type) {
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
    }
  }
`;
