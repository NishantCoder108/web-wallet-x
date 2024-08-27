import { IWallet } from "@/types/wallet";

export function saveWallets(wallets: IWallet[]) {
    localStorage.setItem("wallets", JSON.stringify(wallets));
}

export function loadWallets(): IWallet[] {
    const storedWallets = localStorage.getItem("wallets");
    return storedWallets ? JSON.parse(storedWallets) : [];
}
