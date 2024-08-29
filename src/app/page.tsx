"use client";
import GenerateMnemonic from "@/components/GenerateMnemonic";
import GenerateWallet from "@/components/GenerateWallet";
import Navbar from "@/components/Navbar";
import WalletManager from "@/components/WalletManager";

export default function Home() {
    return (
        <main className="min-h-[70vh]">
            {/* <GenerateMnemonic /> */}
            <WalletManager />
            {/* <GenerateWallet /> */}
        </main>
    );
}

{
    /* <main className="max-w-7xl mx-auto flex flex-col gap-4 p-4 min-h-[92vh]"> */
}
