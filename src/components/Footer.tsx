import { roboto_mono } from "@/lib/fonts";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <section
            className={`max-w-7xl mx-auto border-t px-4 ${roboto_mono.className}`}
        >
            <div className="flex justify-between py-8">
                <p className="text-primary tracking-tight">
                    Conceived and Crafted by
                    <Link
                        href={"https://x.com/NishantTechie"}
                        className="font-bold hover:text-blue-700"
                    >
                        {" "}
                        Nishant
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Footer;
