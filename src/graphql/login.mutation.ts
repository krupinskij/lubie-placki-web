import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation Login($credentials: AuthLoginInput!) {
    login(input: $credentials) {
      token
      refreshToken
    }
  }
`;
