import {
    Connection,
    PublicKey,
    ParsedTransactionWithMeta,
} from "@solana/web3.js";

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL as string;

export async function getTransactionHistory(
    address: string
): Promise<ParsedTransactionWithMeta[]> {
    try {
        const connection = new Connection(RPC_URL);
        const publicKey = new PublicKey(address);

        // Fetch the latest 10 confirmed transactions
        const confirmedSignatures = await connection.getSignaturesForAddress(
            publicKey,
            { limit: 10 }
        );
        const transactions = await Promise.all(
            confirmedSignatures.map(async (signature) => {
                return await connection.getParsedTransaction(
                    signature.signature
                );
            })
        );

        return transactions.filter(
            (tx): tx is ParsedTransactionWithMeta => tx !== null
        );
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        return [];
    }
}
