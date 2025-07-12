'use client';

import { useEffect, useState } from 'react';

const NoSSR = ({ children, fallback = null }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return fallback;
    }

    return children;
};

export default NoSSR;
