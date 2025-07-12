import { Geist, Geist_Mono } from "next/font/google";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { NavbarProvider } from "@/contexts/NavbarContext";
import { CartProvider } from "@/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Xeon",
  description: "We are Team-Xeon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NavbarProvider>
          <CartProvider>
            <ApolloWrapper>
              <ConditionalNavbar />
              <main className="pt-16">
                {children}
              </main>
            </ApolloWrapper>
          </CartProvider>
        </NavbarProvider>
      </body>
    </html>
  );
}
