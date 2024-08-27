import { Connection, Keypair } from "@solana/web3.js";

// Convert Uint8Array to Base64 string
function toBase64(uint8Array: Uint8Array): string {
    return Buffer.from(uint8Array).toString("base64");
}
// Generate a new wallet
export function generateWallet() {
    const wallet = Keypair.generate();

    return wallet;
}

// Get the public key from generated wallet
export function getPublicKey(wallet: Keypair) {
    return wallet.publicKey.toString();
}

// Get the private key from generated wallet
export function getPrivateKey(wallet: Keypair) {
    const secKey = toBase64(wallet.secretKey);
    // const secKey = wallet.secretKey.toString()
    console.log({ secKey });
    return secKey;
}

// Connect to the Solana cluster
export function getConnection() {
    const conn = new Connection(
        "https://api.mainnet-beta.solana.com",
        "confirmed"
    );

    console.log({ conn });
    return conn;
}
