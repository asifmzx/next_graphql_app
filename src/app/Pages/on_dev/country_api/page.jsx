"use client";
import React from "react";
import client from "@/src/apollo-client";
import { ApolloProvider } from "@apollo/client";

import AllCountry from "@/src/components/Pages/GraphQL/Vendure_GraphiQL/Customer_Wrapper";

export default function Home() {
  return (
    <>
      <ApolloProvider client={client}>
        <AllCountry />
      </ApolloProvider>
    </>
  );
}
