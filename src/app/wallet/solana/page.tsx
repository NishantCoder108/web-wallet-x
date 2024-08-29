"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputGrid from "@/components/common/InputGrid";
import { roboto_mono } from "@/lib/fonts";

const SolanaWallet = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [seedArr, setSeeArr] = useState<string[]>([]);

    const handleSubmit = (value: string[]) => {
        console.log("handleSubmit Val", value);
        setSeeArr(value);
    };

    const triggerInputGridForm = () => {
        if (formRef.current) {
            const refVal = formRef.current.requestSubmit();
            console.log({ refVal });
        }
    };
    return (
        <div
            className={` min-h-[70vh] pt-16 pb-2 mb-16 ${roboto_mono.className}`}
        >
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
                        Note: To import an existing wallet, please enter your
                        seed phrase above. If you'd like to create a new wallet,
                        click on 'Generate Wallet'
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
                            //  onClick={() => handleGenerateWallet()}
                            className="w-full"
                        >
                            Generate Wallet
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SolanaWallet;
