import {
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL as string;

export async function sendSolTransaction(
    senderSecretKey: Uint8Array,
    recipientAddress: string,
    amount: number
) {
    try {
        const connection = new Connection(RPC_URL);

        const senderKeypair = Keypair.fromSecretKey(senderSecretKey);
        const recipientPublicKey = new PublicKey(recipientAddress);

        // Create a new transaction
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: senderKeypair.publicKey,
                toPubkey: recipientPublicKey,
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );

        // Sign the transaction and send it
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [senderKeypair]
        );

        console.log("Transaction successful with signature:", signature);
        return signature;
    } catch (error) {
        console.error("Error sending SOL:", error);
        throw error;
    }
}
