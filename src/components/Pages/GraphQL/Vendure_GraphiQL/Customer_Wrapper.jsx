import React from "react";
import ClientOnly from "../../../lib/api";
import Customer from "./Customer";

export default function AllCountry() {
  return (
    <>
      <ClientOnly>
        <Customer />
      </ClientOnly>
    </>
  );
}
