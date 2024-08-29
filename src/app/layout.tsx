import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "WebWalletX Wallet",
    description: "Web Wallet X",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={` ${inter.className}`}>
                <ThemeProvider
                    attribute="class"
                    enableSystem
                    disableTransitionOnChange
                    defaultTheme="system"
                >
                    <div className="max-w-7xl  mx-auto   p-4  ">
                        <Navbar />
                        {children}
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
