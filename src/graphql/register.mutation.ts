import gql from 'graphql-tag';

export const REGISTER_MUTATION = gql`
  mutation Register($credentials: AuthRegisterInput!) {
    register(input: $credentials) {
      token
      refreshToken
    }
  }
`;
