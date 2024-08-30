"use client";
import React, { useRef, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputGrid from "@/components/common/InputGrid";
import { roboto_mono } from "@/lib/fonts";
import {
    generateMnemonic,
    mnemonicToSeed,
    mnemonicToSeedSync,
    validateMnemonic,
} from "bip39";
import { toast } from "sonner";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Copy } from "lucide-react";

const SolanaWallet = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [seedArr, setSeeArr] = useState<string[]>([]);
    const [mnemonicArr, setMnemonicArr] = useState<string[]>([]);
    const [walletList, setWalletList] = useState<
        {
            privateKey: string;
            publicKey: string;
        }[]
    >([]);

    const handleSubmit = (seedValue: string[]) => {
        console.log("handleSubmit Val", seedValue);

        if (!validateMnemonic(seedValue.join(" "))) {
            toast.error("Invalid recovery phrase, Please try again.");
            return;
        }
        setSeeArr(seedValue);
    };

    const triggerInputGridForm = () => {
        if (formRef.current) {
            const refVal = formRef.current.requestSubmit();
            console.log({ refVal });
        }
    };

    const handleGenerateWallet = () => {
        const mnemonic = generateMnemonic();
        console.log({ mnemonic });
        setMnemonicArr(mnemonic.split(" "));
        const seed = mnemonicToSeedSync(mnemonic);
        console.log({ seed });
        //Derivation path
        const path = `m/44'/501'/0'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;

        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
        const convertSecretToBase58 = bs58.encode(secret);

        console.log({ publicKey }, { convertSecretToBase58 });

        setWalletList((prev) => [
            ...prev,
            {
                privateKey: convertSecretToBase58,
                publicKey: publicKey,
            },
        ]);
    };

    const copyToClipboard = (secretPhrase: string) => {
        navigator.clipboard.writeText(secretPhrase);
        toast.success("Copied to clipboard!");
    };
    return (
        <div
            className={` min-h-[70vh] pt-16 pb-2 mb-16 ${roboto_mono.className}`}
        >
            {walletList.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                >
                    <div>
                        <h1 className="tracking-tighter text-4xl md:text-5xl font-black ">
                            Confidential Recovery Phrase
                        </h1>
                        <p className="text-primary/80 font-semibold text-lg md:text-xl py-3">
                            Store these words securely to protect your wallet
                        </p>
                    </div>

                    <div className="flex flex-col  gap-4 ">
                        <div className=" rounded border">
                            <InputGrid
                                onSubmit={handleSubmit}
                                inputText="Import Wallet"
                                formRef={formRef}
                            />
                        </div>
                        <p className="text-sm  text-primary/80 pb-3">
                            Note: To import an existing wallet, please enter
                            your seed phrase above. If you'd like to create a
                            new wallet, click on 'Generate Wallet'
                        </p>
                        <div className="flex justify-evenly items-center  gap-6">
                            <Button
                                size={"lg"}
                                className="w-full bg-slate-400"
                                onClick={() => triggerInputGridForm()}
                            >
                                Import Wallet
                            </Button>
                            <Button
                                size={"lg"}
                                onClick={() => handleGenerateWallet()}
                                className="w-full"
                            >
                                Generate Wallet
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
            {/* Showing Mnemonic phrases */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    ease: easeInOut,
                    duration: 0.3,
                }}
                className={roboto_mono.className}
            >
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-2xl md:text-3xl font-bold tracking-tighter hover:no-underline">
                            Your Secret Phrase
                        </AccordionTrigger>

                        <AccordionContent
                            onClick={() =>
                                copyToClipboard(mnemonicArr.join(" "))
                            }
                        >
                            <motion.div
                                transition={{
                                    ease: easeInOut,
                                    duration: 0.3,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                initial={{
                                    opacity: 0,
                                    y: -20,
                                }}
                                className="hover:cursor-pointer"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 dark:bg-slate-900 p-6 rounded">
                                    {mnemonicArr.map((item) => (
                                        <p className="text-red-500 font-semibold border p-3 flex items-center justify-center rounded">
                                            {item}
                                        </p>
                                    ))}
                                </div>

                                <div className="text-sm md:text-base text-primary/50 flex w-full  dark:bg-slate-900 p-6 gap-3 hover:text-slate-100">
                                    <Copy /> Click Anywhere To Copy
                                </div>
                            </motion.div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </motion.div>

            {/* Showing Public and Private Keys */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: -20,
                }}
                transition={{
                    ease: easeInOut,
                    duration: 0.3,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
            >
                <ul className="border py-6 flex flex-col items-center ">
                    {walletList.length > 0 &&
                        walletList.map((wallet, i) => (
                            <li key={i}>
                                <div>
                                    <p className="font-semibold ">
                                        {" "}
                                        Wallet {i + 1}{" "}
                                    </p>
                                    <p> Public Key : {wallet.publicKey} </p>
                                    <p> Private Key : {wallet.privateKey} </p>
                                </div>
                            </li>
                        ))}
                </ul>
            </motion.div>
        </div>
    );
};

export default SolanaWallet;
