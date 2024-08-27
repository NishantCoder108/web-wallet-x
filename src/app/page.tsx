"use client";

import {
    generateWallet,
    getPrivateKey,
    getPublicKey,
} from "@/utils/solanaWallet";
import { useState } from "react";

interface IWallet {
    index: number;
    publicKey: string;
    privateKey: string;
}
export default function Home() {
    const [wallets, setWallets] = useState<IWallet[]>([]);

    const handleGenerateWallet = () => {
        console.log("Generated Wallet.");

        const newWallets: IWallet[] = [];
        for (let i = 0; i < 5; i++) {
            const wallet = generateWallet();
            newWallets.push({
                index: i,
                publicKey: getPublicKey(wallet),
                privateKey: getPrivateKey(wallet),
            });
        }

        setWallets(newWallets);
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Solana Web Based Wallet</h1>
            <button onClick={handleGenerateWallet}>Generate Wallet</button>
            {wallets.length > 0 && (
                <ul className="p-7">
                    {wallets.map((wallet) => (
                        <li key={wallet.index}>
                            <div className="p-6">
                                <h2>Wallet {wallet.index} </h2>
                                <p> Public Key : {wallet.publicKey} </p>
                                <p> Private Key : {wallet.privateKey} </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
