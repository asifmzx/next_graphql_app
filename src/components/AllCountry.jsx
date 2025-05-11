import React from 'react';
import ClientOnly from "../components/lib/api";
import Country from "../components/Country";



export default function AllCountry() {

    return (
        <>
            <ClientOnly>
                <Country />
            </ClientOnly>
        </>
    );
};

