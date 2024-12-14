import { gql } from '@apollo/client';

export const GET_USERS = gql`
{
  registrations(orderBy: blockTimestamp, orderDirection: desc) {
    blockTimestamp
    user
    userId
  }
  upgrades(where: {}, orderBy: blockTimestamp, orderDirection: desc) {
    level
    matrix
    referrer
    transactionHash
    user
    blockTimestamp
  }
}
`;