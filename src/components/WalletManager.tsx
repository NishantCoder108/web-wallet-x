import React from "react";
import { easeInOut, motion } from "framer-motion";
import { roboto_mono } from "@/lib/fonts";
import { Button } from "./ui/button";
import Link from "next/link";

const WalletManager = () => {
    return (
        <div className={`my-16 ${roboto_mono.className}`}>
            <motion.div
                className="box"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
            >
                <div className={`flex flex-col gap-2  `}>
                    <h1 className="tracking-tighter text-4xl md:text-5xl font-black">
                        WebWalletX is designed to support multiple blockchain
                        platforms.
                    </h1>
                    <p className="text-primary/80 font-semibold text-lg md:text-xl">
                        Choose a blockchain to get started.
                    </p>
                </div>

                <div className="flex gap-2 py-6">
                    <Link href={"/wallet/solana"}>
                        <Button size={"lg"}>Solana</Button>
                    </Link>
                    <Link href={"/wallet/ethereum"}>
                        <Button size={"lg"}>Ethereum</Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default WalletManager;
