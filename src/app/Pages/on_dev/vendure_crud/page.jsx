"use client";
import React from "react";
import CustomerDebugExample from "@/components/Pages/GraphQL/Vendure_GraphQL/Customer/CustomerDebugExample";
import CustomerMutationExample from "@/components/Pages/GraphQL/Vendure_GraphQL/Customer/CustomerMutationExample";

export default function Home() {
  return (
    <>
      {/* <CustomerDebugExample /> */}
      <CustomerMutationExample />
    </>
  );
}
