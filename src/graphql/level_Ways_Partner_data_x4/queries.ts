import { gql } from '@apollo/client';

export const x4Activelevelpartner = gql`
    query NewUserPlaces($walletAddress: String!, $level: Int!) {
        newUserPlaces(
            where: { referrer: $walletAddress, matrix: 2, level: $level }
            orderBy: blockTimestamp
            orderDirection: asc
        ) {
            user
            place
        }
    }
`;