import React from "react";
import { Router } from '@reach/router'
import { useQuery } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

import { SignScreen } from "../Sign";
import { GameLauncher } from "../GameLauncher";
import { GamesList } from "../GamesList";
import { NotFound } from "../NotFound";
import { TopBar } from "../TopBar";
import { Leaderboard } from "../Leaderboard";

const GET_AUTH_USER = gql`
    {
        authUser @client {
            id,
            name,
        }
    }
`;


const Bootstrap = () => {
    const { data, error, loading } = useQuery(GET_AUTH_USER);

    if (loading) {
        return <h1>LOADING...</h1>
    }

    if (error) {
        return <pre>{error.message}</pre>
    }

    if (data.authUser) {
        return (
            <>
                <TopBar />
                <Router>
                    <NotFound default />
                    <GamesList path="/" />
                    <GameLauncher path="/game/:name" userId={data.authUser.id} />
                    <Leaderboard path="/leaderboard" />
                </Router>
            </>
        )
    }

    return (
        <Router>
            <NotFound default />
            <SignScreen path="/" />
        </Router>
    );
};

export { Bootstrap }
