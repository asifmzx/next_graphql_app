"use client";
import React from "react";
import createApolloClient from "../../../apollo-client";
import { ApolloProvider } from "@apollo/client";

import AllCountry from "../../../components/AllCountry";

const client = createApolloClient();

export default function Home() {
  return (
    <>
      <ApolloProvider client={client}>
        <AllCountry />
      </ApolloProvider>
    </>
  );
}
