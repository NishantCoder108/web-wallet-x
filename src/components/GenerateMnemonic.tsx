import { generateWalletMnemonic } from "@/utils/mnemonic";
import React, { useState } from "react";

const GenerateMnemonic = () => {
    const [mnemonic, setMnemonic] = useState<string | null>(null);

    const handleGenerateMnemonic = () => {
        const newMnemonic = generateWalletMnemonic();
        setMnemonic(newMnemonic);
    };

    return (
        <div className="flex flex-col items-center p-5">
            <button
                onClick={handleGenerateMnemonic}
                className="underline text-xl"
            >
                {" "}
                Generate Mnemonic
            </button>

            {mnemonic && (
                <div className="p-4 border rounded bg-gray-300">
                    <p className="text-xl font-bold "> Your Mnemonic Phrase:</p>
                    <p className="text-red-500 bg-slate-200  p-6 rounded">
                        {mnemonic}
                    </p>
                    <p className="text-sm py-3">
                        Please write down this phrase and store it securely.
                    </p>
                </div>
            )}
        </div>
    );
};

export default GenerateMnemonic;
