import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

export function generateWalletMnemonic(): string {
    //It will generate 12 word mnemonic phrase
    const mnemonic = generateMnemonic();
    return mnemonic;
}

export function convertMnemonicToSeed(mnemonic: string): Buffer {
    //Convert mnemonic phrase into seed
    const seed = mnemonicToSeedSync(mnemonic);
    return seed;
}

export function generateKeypairFromSeed(
    seedHex: string,
    index: number
): string {
    // Define the derivation path
    const derivationPath = `m/44'/501'/${index}'/0'`;

    // Convert seed to buffer
    const seedBuffer = Buffer.from(seedHex, "hex");

    // Derive the seed for the specific path
    const derivedSeed = derivePath(
        derivationPath,
        seedBuffer.toString("hex")
    ).key;

    // Generate the key pair using nacl
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

    // Convert nacl key pair to Solana Keypair
    const solanaKeypair = Keypair.fromSecretKey(Buffer.from(keyPair.secretKey));

    // Return the public key in Base58 format
    return solanaKeypair.publicKey.toBase58();
}
