import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getLocalWallet = () => {
    const storage = localStorage.getItem("wallets");

    const parsedStorage = storage ? JSON.parse(storage) : null;

    return parsedStorage;
};

export const copyToClipboard = (secretPhrase: string) => {
    navigator.clipboard.writeText(secretPhrase);
    toast.success("Copied to clipboard!");
};
