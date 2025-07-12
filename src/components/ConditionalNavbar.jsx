"use client";
import { useNavbar } from '@/contexts/NavbarContext';
import Navbar from '@/app/Navbar';

const ConditionalNavbar = () => {
    const { isNavbarVisible } = useNavbar();

    return isNavbarVisible ? <Navbar /> : null;
};

export default ConditionalNavbar;
