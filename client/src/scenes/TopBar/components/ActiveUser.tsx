import React from 'react'
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";

const GET_AUTH_USER = gql`
    {
        authUser @client {
            id,
            name,
        }
    }
`;

const ActiveUser = () => {
    const { data, error, loading } = useQuery(GET_AUTH_USER);

    if (error || !data) {
        return null;
    }

    if (loading) {
        return <span>Loading...</span>
    }

    return (
        <div>
            USER: {data.authUser.name}
        </div>
    )
};

export { ActiveUser }
