"use client";
import React from 'react';
import { useNavbarControl } from '@/hooks/useNavbarControl';

const PageWrapper = ({ children, showNavbar = true, className = '' }) => {
    useNavbarControl(showNavbar);

    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default PageWrapper;
