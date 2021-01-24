import gql from 'graphql-tag';

export const REGISTER_MUTATION = gql`
    mutation Login($credentials: AuthLoginInput!) {
        login(input: $credentials) {
            token
        }
    }
`