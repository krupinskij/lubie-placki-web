import gql from 'graphql-tag';

export const REFRESH_TOKEN_QUERY = gql`
  query RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
    }
  }
`;
