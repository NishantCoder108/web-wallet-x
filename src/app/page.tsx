"use client";
import GenerateMnemonic from "@/components/GenerateMnemonic";
import GenerateWallet from "@/components/GenerateWallet";

export default function Home() {
    return (
        <div>
            <GenerateMnemonic />
            <GenerateWallet />
        </div>
    );
}
