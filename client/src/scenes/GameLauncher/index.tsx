import React, { FunctionComponentElement, useEffect, useCallback }  from 'react'
import { RouteComponentProps } from '@reach/router';
import { useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

import { GamesRegistry } from "../../games/repository";

interface Props extends RouteComponentProps {
    userId: number,
    name?: string
}

const WRITE_RESULTS = gql`
  mutation WriteResults($userId: Int!, $data: String!) {
      writeResults(input: { userId: $userId, data: $data }) {
          errors
      }
  } 
`;

const useGameRunner = (userId: number, name: string) => {
    const renderer = GamesRegistry.getGameRendererByName(name);
    const writeResults = useMutation(WRITE_RESULTS);
    const handleWriteResults = useCallback((results) => {
        const data = JSON.stringify(results);

        writeResults({ variables: { userId, data } });
    }, [writeResults]);
    useEffect(() => {
        renderer.create({
            onCompleteGame: handleWriteResults
        });

        return () => renderer.destroy()
    });
};

const GameLauncher = ({ userId, name = '' }: Props): FunctionComponentElement<Props> => {
    useGameRunner(userId, name);

    return (
        <div>Game page</div>
    )
};

export { GameLauncher }
