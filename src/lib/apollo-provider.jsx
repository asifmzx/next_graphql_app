"use client";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "http://localhost:3000/shop-api",
    credentials: "include",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
        }
    }
});

function makeClient() {
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        ssrMode: typeof window === "undefined",
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'all',
            },
            query: {
                errorPolicy: 'all',
            },
        },
    });
}

let apolloClient;

export function getClient() {
    if (typeof window === "undefined") {
        return makeClient();
    }

    if (!apolloClient) {
        apolloClient = makeClient();
    }
    return apolloClient;
}

export function ApolloWrapper({ children }) {
    return (
        <ApolloProvider client={getClient()}>
            {children}
        </ApolloProvider>
    );
}
