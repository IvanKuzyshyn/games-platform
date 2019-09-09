import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'

import { GamesRegistry } from "../../games/repository";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:3000/graphql'
    }),
    resolvers: {
        Query: {
            games: () => {
                return GamesRegistry.mapGamesForQuery()
            }
        }
    }
});

export { client }
