import React, { useState, useEffect } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import Navbar from "../components/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import toast from "react-hot-toast";
import { Buffer } from "buffer"; // Import Buffer

// Ensure Buffer is available globally
window.Buffer = Buffer;

interface TipCreatorProps {}

const Tipcreator: React.FC<TipCreatorProps> = () => {
  const navigate = useNavigate();
  const { connected, wallet }: { connected: boolean; wallet?: any } =
    useWallet();
  const [amount, setAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");

  async function checkLogin() {
    if (!connected) {
      navigate("/Login");
    }
  }

  useEffect(() => {
    checkLogin();
  }, [connected]);

  async function tip(publicKeyStr: string, amount: number) {
    if (!wallet?.connected || !wallet.adapter.signTransaction) {
      toast.error("Wallet is not connected or does not support signing.");
      return;
    }

    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    );

    const recipientPublicKey = new PublicKey(publicKeyStr.toString());

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipientPublicKey,
        lamports: amount * 100000000,
      })
    );

    try {
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [wallet.adapter]
      );
      toast.success("Transaction Completed");
      console.log("Transaction successful with signature:", signature);
    } catch (error) {
      //@ts-ignore
      toast.error("Transaction failed: " + error.message);
      console.error("Transaction failed:", error);
    }
  }

  return (
    <WalletModalProvider>
      <div className="h-screen w-screen bg-black">
        <Navbar />
        <div className="flex justify-center items-center w-full h-[600px]">
          <div className="max-w-md mx-auto bg-[#2c2d31] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-blue-500 font-bold mb-4">
              Tip a Creator
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (recipient && amount > 0 && wallet?.connected) {
                  await tip(recipient, amount);
                } else {
                  toast.error("Please enter a valid recipient and amount.");
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-white mb-1">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                  className="w-full p-2 border rounded outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-1">Amount (SOL)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  required
                  min="0.01"
                  step="0.01"
                  className="w-full p-2 outline-none border rounded"
                />
              </div>
              <div className="mb-4 flex flex-row space-x-4">
                <span
                  className="bg-blue-500 cursor-pointer text-white p-1 rounded-md"
                  onClick={() => setAmount(1)}
                >
                  1 SOL
                </span>
                <span
                  className="bg-blue-500 cursor-pointer text-white p-1 rounded-md"
                  onClick={() => setAmount(5)}
                >
                  5 SOL
                </span>
                <span
                  className="bg-blue-500 cursor-pointer text-white p-1 rounded-md"
                  onClick={() => setAmount(10)}
                >
                  10 SOL
                </span>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Send Tip
              </button>
            </form>
          </div>
        </div>
      </div>
    </WalletModalProvider>
  );
};

export default Tipcreator;
