import gql from 'graphql-tag';

export const RECIPE_QUERY = gql`
    query Recipe($id: String!) {
        recipe(id: $id) {
            id
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
        }
    }
`;
