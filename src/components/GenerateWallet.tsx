import { IWallet } from "@/types/wallet";
import { loadWallets, saveWallets } from "@/utils/localStorage";
import {
    generateWallet,
    getPrivateKey,
    getPublicKey,
} from "@/utils/solanaWallet";
import { useEffect, useState } from "react";

export default function GenerateWallet() {
    const [wallets, setWallets] = useState<IWallet[]>([]);

    const handleGenerateWallet = () => {
        console.log("Generated Wallet.");

        const wallet = generateWallet();
        const newWallet = {
            index: wallets.length === 0 ? 0 : wallets.length,
            publicKey: getPublicKey(wallet),
            privateKey: getPrivateKey(wallet),
        };

        const allWallet = [...wallets, newWallet];
        setWallets(allWallet);
        console.log("After generate logged 2");
        saveWallets(allWallet);
        console.log("After generate logged 3");
    };
    console.log("Logged1");
    useEffect(() => {
        const storedWallets = loadWallets();
        if (storedWallets.length > 0) {
            setWallets(storedWallets);
        }
    }, []);
    return (
        <main className="p-6 flex items-center justify-center flex-col ">
            <h1 className="font-bold text-2xl underline py-3">
                Solana Web Based Wallet
            </h1>
            <button onClick={handleGenerateWallet}>Generate Wallet</button>
            {wallets.length > 0 && (
                <ul className="p-7 flex gap-3 flex-col ">
                    {wallets.map((wallet) => (
                        <li key={wallet.index} className="border-2 rounded">
                            <div className="p-6 container ">
                                <h2 className="text-sm font-extrabold underline lg:text-base py-2">
                                    Wallet {wallet.index}{" "}
                                </h2>
                                <p className="text-xs lg:text-base">
                                    <span className="font-bold">
                                        Public Key :
                                    </span>
                                    {wallet.publicKey}{" "}
                                </p>
                                <p className="text-xs lg:text-base flex">
                                    {" "}
                                    <span className="font-bold">
                                        Private Key :
                                    </span>
                                    <span className="truncate block">
                                        {" "}
                                        {wallet.privateKey}{" "}
                                    </span>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
