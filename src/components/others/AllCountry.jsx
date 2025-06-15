import React from 'react';
import ClientOnly from "../lib/api";
import Country from "../others/Country";



export default function AllCountry() {

    return (
        <>
            <ClientOnly>
                <Country />
            </ClientOnly>
        </>
    );
};

