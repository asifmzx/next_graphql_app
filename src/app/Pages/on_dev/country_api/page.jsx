"use client";
import React from "react";
import client from "@/apollo-client";
import { ApolloProvider } from "@apollo/client";

import CustomerDebugExample from "@/components/Pages/GraphQL/Vendure_GraphiQL/CustomerDebugExample";
import CustomerMutationExample from "@/components/Pages/GraphQL/Vendure_GraphiQL/CustomerMutationExample";

export default function Home() {
  return (
    <>
      <ApolloProvider client={client}>
        {/* <CustomerDebugExample /> */}
        <CustomerMutationExample />
      </ApolloProvider>
    </>
  );
}
