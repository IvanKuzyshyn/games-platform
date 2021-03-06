import React, { useState, ChangeEvent } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const FIND_USER_BY_NAME = gql`
    query User($name: String!) {
        user(name: $name) {
            id,
            createdAt,
            name
        }
    }
`;

const CREATE_USER_WITH_NAME = gql`
    mutation CreateUser($name: String!) {
        createUser(input: { name: $name }) {
            user {
                id,
                createdAt,
                name
            },
            errors
        }
    }
`;



const SignForm = () => {
    const [name, setName] = useState('');
    const client = useApolloClient();

    async function getUser(name: string) {
        const { data } = await client.query({
            query: FIND_USER_BY_NAME,
            variables: { name }
        });

        if (!data.user) {
            const { data, errors } =  await client.mutate({
                mutation: CREATE_USER_WITH_NAME,
                variables: { name }, // TODO update
            });

            client.writeData({
                data: { authUser: data.createUser.user }
            });
        }

        client.writeData({
            data: { authUser: data.user }
        });
    }

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        setName(value)
    }

    function handleSubmit() {
        if (!name) {
            return
        }

        getUser(name)
    }

    return (
        <div>
            <input type="text" name="name" onChange={handleChangeName} value={name} />
            <button onClick={handleSubmit}>Sign in</button>
        </div>
    )
};

export default SignForm
