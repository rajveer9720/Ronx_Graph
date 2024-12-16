import { gql } from '@apollo/client';

export const x3Activelevelpartner = gql`
    query NewUserPlaces($walletAddress: String!, $level: Int!) {
        newUserPlaces(
            where: { referrer: $walletAddress, matrix: 1, level: $level }
            orderBy: blockTimestamp
            orderDirection: asc
        ) {
            user
            place
        }
    }
`;