import { generateMnemonic } from "bip39";

export function generateWalletMnemonic(): string {
    //It will generate 12 word mnemonic phrase
    const mnemonic = generateMnemonic();
    return mnemonic;
}
