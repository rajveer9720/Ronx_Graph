import { gql } from '@apollo/client';

export const x3ActiveLevel = gql`
  query x3ActiveLevel($user: String!) {
    upgrades(
      where: { matrix: 1, user: $user }
      orderBy: user
      orderDirection: desc
    ) {
      level
    }
  }
`;