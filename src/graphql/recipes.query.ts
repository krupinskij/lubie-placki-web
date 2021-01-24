import gql from 'graphql-tag';

export const RECIPES_QUERY = gql`
    query Recipes {
        recipes {
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
