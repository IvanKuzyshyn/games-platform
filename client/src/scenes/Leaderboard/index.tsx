import React from 'react'
import { RouteComponentProps } from '@reach/router';
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";

type ResultsType = {
    results: Array<{
        id: number,
        userId: number,
        data: string
    }>,
    authUser: {
        id: number
    }
}

const GET_RESULTS = gql`
    query {
        results {
            id,
            userId,
            data
        },
        authUser @client {
            id
        }
    }
`;

const Leaderboard = (props: RouteComponentProps) => {
    const { data, loading, error } = useQuery<ResultsType>(GET_RESULTS);

    if (loading) {
        return <h1>Loading....</h1>
    }

    if (error) {
        return <pre>{error.message}</pre>
    }

    if (!data || data.results.length === 0) {
        return <div>Empty leaderboard! Be first to play a game!</div>
    }

    return (
        <div>
            {data.results.map(result => (
                <div key={result.id}>
                    <div>
                        User ID: {result.userId}
                        {result.userId === data.authUser.id && ' - IT IS ME'}
                    </div>
                </div>
            ))}
        </div>
    )
};

export { Leaderboard }
