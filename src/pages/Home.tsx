import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import Navbar from "../components/Navbar";
import { getWalletBalance, getusdbalance } from "../script.ts/wallet";

function Home() {
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();
  const [balance, Setbalance] = useState(0);
  const [usdbalance, Setusdbalance] = useState(0);

  async function checklogin() {
    if (!connected) {
      navigate("/Login");
    }
    if (connected) {
      //@ts-ignore
      const mybalance = await getWalletBalance(publicKey.toString());
      //@ts-ignore
      Setbalance(mybalance);
      //@ts-ignore
      const usdbal = await getusdbalance(mybalance);
      //@ts-ignore
      Setusdbalance(usdbal);
    }
  }

  useEffect(() => {
    checklogin();
  }, [connected]);

  return (
    <WalletModalProvider>
      <div className="h-screen w-screen bg-black">
        <Navbar />
        <div className="flex justify-center items-center w-full h-[600px]">
          <div className="text-white w-[600px] h-[300px] flex justify-center items-center border-2 border-white rounded-md p-4">
            <div className="w-full">
              <h1 className="text-center text-5xl font-bold">Balance</h1>
              <br />
              <h1 className="text-center text-3xl font-semibold">
                {balance.toString().slice(0, 9)} SOL
              </h1>
              <h1 className="text-center text-2xl">${usdbalance.toFixed(2)}</h1>
              <br />
              <div className="flex justify-around items-center my-4">
                <span
                  className="p-2 rounded-md bg-blue-500 cursor-pointer"
                  onClick={() => {
                    navigate("/tip");
                  }}
                >
                  Tip creator
                </span>
                <span className="p-2 rounded-md bg-blue-500 cursor-pointer">
                  Browse creator
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WalletModalProvider>
  );
}

export default Home;
