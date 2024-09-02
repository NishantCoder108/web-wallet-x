import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Balance from "./Balance";

const WalletTabs = () => {
    const [activeTab, setActiveTab] = useState("balance");

    return (
        <div className="">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="balance">Balance</TabsTrigger>
                    <TabsTrigger value="transaction-history">
                        Transaction History
                    </TabsTrigger>
                    <TabsTrigger value="send">Send</TabsTrigger>
                </TabsList>

                <TabsContent value="balance">
                    <div className="p-2">
                        <Balance />
                    </div>
                </TabsContent>

                <TabsContent value="transaction-history">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4">
                            Transaction History
                        </h2>
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Date</th>
                                    <th className="py-2 px-4 border-b">
                                        Amount
                                    </th>
                                    <th className="py-2 px-4 border-b">
                                        Recipient
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Example transaction data */}
                                <tr>
                                    <td className="py-2 px-4 border-b">
                                        2024-09-02
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        0.5 SOL
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        Address 1
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b">
                                        2024-09-01
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        2 SOL
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        Address 2
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                <TabsContent value="send">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4">
                            Send Transaction
                        </h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Recipient Address
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter recipient address"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter amount"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default WalletTabs;
