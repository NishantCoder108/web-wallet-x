"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

const NetworkSwitcher: React.FC = () => {
    const router = useRouter();

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const cluster = searchParams.get("cluster");

    console.log("1 Cluster", cluster);
    const [selectedCluster, setSelectedCluster] = useState<string>(
        (cluster as string) || "devnet"
    );
    useEffect(() => {
        const rpcUrl =
            selectedCluster === "mainnet"
                ? process.env.NEXT_PUBLIC_MAINNET_RPC_URL
                : process.env.NEXT_PUBLIC_DEVNET_RPC_URL;

        console.log(`Using ${selectedCluster} with RPC URL: ${rpcUrl}`);

        const checkUrl = pathname.includes("?");
        const url = checkUrl
            ? `${pathname}&cluster=${selectedCluster}`
            : `${pathname}?cluster=${selectedCluster}`;
        console.log("URL", url);

        router.push(url);
    }, [selectedCluster]);

    console.log({ selectedCluster });
    const handleClusterChange = (value: string) => {
        setSelectedCluster(value);
    };

    return (
        <Select value={selectedCluster} onValueChange={handleClusterChange}>
            <SelectTrigger className="w-[180px]">
                <span>
                    {selectedCluster === "mainnet" ? "Mainnet" : "Devnet"}
                </span>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="devnet">Devnet</SelectItem>
                <SelectItem value="mainnet">Mainnet</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default NetworkSwitcher;
