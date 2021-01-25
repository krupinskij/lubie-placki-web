import gql from 'graphql-tag';

export const CREATE_RECIPE_MUTATION = gql`
    mutation CreateRecipe($credentials: RecipeInput!){
        createRecipe(input: $credentials) {
            _id
        }
    }
`