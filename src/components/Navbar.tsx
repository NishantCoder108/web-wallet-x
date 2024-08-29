import { platypi } from "@/lib/fonts";
import { Box, WalletMinimal } from "lucide-react";
import React from "react";
import { ModeToggle } from "./ui/themeButton";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center py-4">
            <Link href={"/"}>
                <div className={`flex items-center gap-2 ${platypi.className}`}>
                    <WalletMinimal size={30} strokeWidth={3} />
                    <div className="flex flex-col gap-4">
                        <span className="tracking-tighter text-3xl font-extrabold text-primary flex gap-2 items-center ">
                            WebWalletX
                        </span>
                    </div>
                </div>
            </Link>
            <ModeToggle />
        </nav>
    );
};

export default Navbar;
