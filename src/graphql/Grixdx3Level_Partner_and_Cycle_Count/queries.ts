import { gql } from '@apollo/client';

// Grixdx3Level_Partner_and_Cycle_Count
export const Grixdx3Level_Partner_and_Cycle_Count = (referrer: string, matrix: number, level: number) => gql`
{
    newUserPlaces(
        where: {referrer: "${referrer}", matrix: ${matrix}, level: ${level}}
        orderBy: blockTimestamp
        orderDirection: asc
    ) {
        user
        place
    }
}
`;