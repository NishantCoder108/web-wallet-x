import { Connection, PublicKey } from "@solana/web3.js";

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL as string;

export async function getSolanaBalance(address: string): Promise<number> {
    try {
        const connection = new Connection(RPC_URL);
        const publicKey = new PublicKey(address);
        const balance = await connection.getBalance(publicKey);

        // Convert lamports to SOL
        return balance / 1e9;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return 0;
    }
}
