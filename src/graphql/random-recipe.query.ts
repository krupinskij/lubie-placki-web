import gql from 'graphql-tag';

export const RANDOM_RECIPE_QUERY = gql`
  query {
    randomRecipe
  }
`;
