"use client";
import { useEffect } from "react";
import { useNavbar } from "@/contexts/NavbarContext";

export const useNavbarControl = (isVisible = true) => {
  const { showNavbar, hideNavbar } = useNavbar();

  useEffect(() => {
    if (isVisible) {
      showNavbar();
    } else {
      hideNavbar();
    }

    return () => {
      showNavbar();
    };
  }, [isVisible, showNavbar, hideNavbar]);
};
