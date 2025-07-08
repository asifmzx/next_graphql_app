import React from "react";
import CustomerOnly from "@/components/lib/api";
import Customer from "./Customer";

export default function CustomerWrapper() {
  return (
    <>
      <CustomerOnly>
        <Customer />
      </CustomerOnly>
    </>
  );
}
