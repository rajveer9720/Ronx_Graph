import { gql } from '@apollo/client';

export const GET_USERS = gql`
{
  newUserPlaces(orderBy: blockTimestamp, orderDirection: desc) {
    user
      place
    matrix
    level
    blockTimestamp
  
  }
}
`;