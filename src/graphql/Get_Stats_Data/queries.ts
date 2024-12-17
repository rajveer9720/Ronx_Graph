import {gql} from'@apollo/client';
export const GET_STATS_DATA = gql`
query MyQuery {
  newUserPlaces(
    orderBy: blockNumber
    orderDirection: desc
    where: {referrer: "0xD733B8fDcFaFf240c602203D574c05De12ae358C", matrix: 1}
  ) {
    blockTimestamp
    user
    matrix
    level
    place
    transactionHash
  }
}`;