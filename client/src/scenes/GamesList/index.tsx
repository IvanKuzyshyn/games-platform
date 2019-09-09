import React from 'react'
import { RouteComponentProps, Link } from '@reach/router';
import { useQuery } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const GET_GAMES_COLLECTION = gql`
    query {
        games @client {
            title,
            name,
            id
        }
    }
`;

const GamesList = (props: RouteComponentProps) => {
    const { data, error, loading } = useQuery<{games: Array<any>}>(GET_GAMES_COLLECTION);

    if (loading) {
        return <h1>LOADING...</h1>
    }

    if (error) {
        return <pre>{error.message}</pre>
    }

    if (!data) {
        return <pre>Data not loaded</pre>;
    }

    return (
        <div>
            <ul>
                {data.games.map(game => (
                    <li key={game.id}>
                        <Link to={`/game/${game.name}`}>{game.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export {
    GamesList
}
